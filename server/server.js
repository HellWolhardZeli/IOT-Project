const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload);

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No File Uploaded' });
  }
  const file = req.files.file;
  file.forEach((file) => {
    file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      return res.json({
        fileName: file.name,
        filePath: `/uploads/${file.name}`,
      });
    });
  });
});

app.listen(5000, () => {
  console.log('server started at port 5000');
});
