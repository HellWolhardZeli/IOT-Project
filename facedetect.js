const msRest = require('@azure/ms-rest-js');
const Face = require('@azure/cognitiveservices-face');
const uuid = require('uuid/v4');

key = '61c2cdff9aa34b059e4c17d1884bf0a4';
endpoint = 'https://iotproject.cognitiveservices.azure.com/';

const credentials = new msRest.ApiKeyCredentials({
  inHeader: { 'Ocp-Apim-Subscription-Key': key },
});
const client = new Face.FaceClient(credentials, endpoint);

const image_base_url = `${__dirname}/uploads/images/`;
const person_group_id = uuid();

async function DetectFaceRecognize(url) {
  // Detect faces from image URL. Since only recognizing, use the recognition model 1.
  // We use detection model 2 because we are not retrieving attributes.
  let detected_faces = await client.face.detectWithUrl(url, {
    detectionModel: 'detection_02',
    recognitionModel: 'recognition_03',
  });
  return detected_faces;
}

async function FindSimilar() {
  console.log('========FIND SIMILAR========');
  console.log();

  const source_image_file_name = `${__dirname}/uploads/images/0.png`;
  const target_image_file_names = ['1.png', '2.png', '3.png', '4.png', '5.png'];

  let target_face_ids = (
    await Promise.all(
      target_image_file_names.map(async function (target_image_file_name) {
        // Detect faces from target image url.
        var faces = await DetectFaceRecognize(
          image_base_url + target_image_file_name
        );
        console.log(
          faces.length +
            ' face(s) detected from image: ' +
            target_image_file_name +
            '.'
        );
        return faces.map(function (face) {
          return face.faceId;
        });
      })
    )
  ).flat();

  // Detect faces from source image url.
  let detected_faces = await DetectFaceRecognize(
    image_base_url + source_image_file_name
  );

  // Find a similar face(s) in the list of IDs. Comapring only the first in list for testing purposes.
  let results = await client.face.findSimilar(detected_faces[0].faceId, {
    faceIds: target_face_ids,
  });
  results.forEach(function (result) {
    console.log(
      'Faces from: ' +
        source_image_file_name +
        ' and ID: ' +
        result.faceId +
        ' are similar with confidence: ' +
        result.confidence +
        '.'
    );
  });
  console.log();
}

async function main() {
  // await DetectFaceExtract();
  await FindSimilar();
  // await IdentifyInPersonGroup();
  console.log('Done.');
}
main();
