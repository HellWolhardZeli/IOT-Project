var axios = require('axios');

export const getFaceId = (data) => {
  const returnData = 'test';
  var config = {
    method: 'post',
    url: 'https://iotproject.cognitiveservices.azure.com/face/v1.0/detect',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key': '61c2cdff9aa34b059e4c17d1884bf0a4',
    },
    data: data,
  };

  return axios(config)
    .then(function (response) {
      console.log(response.data[0].faceId);
      return response.data[0].faceId;
    })

    .catch(function (error) {
      console.log(error);
    });
};

export const isSameFace = async (faceId1, faceId2) => {
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

  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response.data.isIdentical;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getName = () => {
  return 'aditya';
};
