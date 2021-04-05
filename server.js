const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(fileUpload());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Upload Endpoint
app.post('/upload/image', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/uploads/images/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/images/${file.name}` });
  });
});

app.post('/upload/video', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const video = req.files.video;

  video.mv(`${__dirname}/uploads/videos/${video.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: video.name,
      filePath: `/uploads/videos/${video.name}`,
    });
  });
});

app.get('/match', (req, res) => {
  var spawn = require('child_process').spawn;
  var process = spawn('python', [
    'compare_faces.py',
    req.query.firstname,
    req.query.lastname,
  ]);
});

app.listen(5000, () => console.log('Server Started...'));
