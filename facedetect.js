var axios = require('axios');

async function getFaceId(data) {
  var config = {
    method: 'post',
    url: 'https://iotproject.cognitiveservices.azure.com/face/v1.0/detect',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '61c2cdff9aa34b059e4c17d1884bf0a4',
    },
    data: data,
  };

  return await axios(config).then((response) => {
    // response.data[0].faceId;
    // console.log(response.data[0].faceId);
    return response.data;
    // callback(response.data);
  });
  // return resp;
}

async function isSameFace(faceId1, faceId2) {
  var data = JSON.stringify({
    faceId1: `${faceId1}`,
    faceId2: `${faceId2}`,
  });

  var config = {
    method: 'post',
    url: 'https://iotproject.cognitiveservices.azure.com/face/v1.0/verify',
    headers: {
      'Ocp-Apim-Subscription-Key': '61c2cdff9aa34b059e4c17d1884bf0a4',
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return await axios(config)
    .then(function (response) {
      // console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

const getName = () => {
  return 'aditya';
};

module.exports = { getFaceId, isSameFace, getName };
