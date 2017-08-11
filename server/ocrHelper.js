let axios = require('axios');


const textProcessing = (url, content, res, textArray) => {
  axios({
    method: 'post',
    url: url,
    data: {
      "requests": [
        {
          "image": {
            "content": content
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    }
  })
    .then(function(response) {
      var parsedText = response.data.responses[0].textAnnotations;
      textArray.push(parsedText[0].description);
    }) 
    .catch(function(error) {
      throw error; 
      console.log(error);
    })
}


const getSignUpInfo = (arr) => {
  let info = [];
  arr.forEach((item) => {
    let dateIndex = item.indexOf('Date Time'); 
    let salesIndex = item.indexOf('Sales Associate'); 
    let date = item.slice(dateIndex, dateIndex + 35);
    let sales = item.slice(salesIndex, salesIndex + 25); 
    info.push({
      date: date, 
      sales: sales
    })
  })
  return info;
}


module.exports = {
  textProcessing,
  getSignUpInfo
}