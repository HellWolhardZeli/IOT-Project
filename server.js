const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');

const imgDir = 'images';
const toFindDir = 'toFindImage';

const app = express();

const { getFaceId, isSameFace, getName } = require('./facedetect.js');
const { Face } = require('@azure/cognitiveservices-face');
const { promiseToCallback } = require('@azure/ms-rest-js');

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

var FaceIdArr = [''];

var noOfFiles = 0;

async function findFaceId(image) {
  let detectedFaceId = await getFaceId(image);
  return detectedFaceId;
}

async function veriyfyFaceId(image1, image2) {
  let isSame = await isSameFace(image1, image2);
  return isSame;
}

app.get('/match', async (req, res) => {
  var filenames = fs.readdirSync(imgDir);
  let FaceIds = await Promise.all(
    filenames.map(async function (filename, i) {
      const imageBuffer = fs.readFileSync(imgDir + '/' + filename);
      var faces = await findFaceId(imageBuffer);
      return faces.map(function (face) {
        return face.faceId;
      });
    })
  );
  filenames = fs.readdirSync(toFindDir);
  let FaceId = await Promise.all(
    filenames.map(async function (filename, i) {
      const imageBuffer = fs.readFileSync(toFindDir + '/' + filename);
      var faces = await findFaceId(imageBuffer);
      return faces.map(function (face) {
        return face.faceId;
      });
    })
  );

  let foundArr = await Promise.all(
    FaceIds.map(async (faceid) => {
      var found = await veriyfyFaceId(faceid, FaceId[0]);
      //  console.log(found);
      return found;
    })
  );
  console.log(foundArr);
});

app.listen(5000, () => console.log('Server Started...'));
