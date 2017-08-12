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


const getSignUpInfo = (str) => { 
  const dateIndex = str.indexOf('Date Time'); 
  const salesIndex = str.indexOf('Sales Associate'); 
  const dateRaw = str.slice(dateIndex, dateIndex + 35);
  const dateFormat = /\d\d-\D\D\D-\d\d/;
  const date = dateRaw.match(dateFormat)[0];
  let salesRaw = str.slice(salesIndex, salesIndex + 25); 
  salesRaw = salesRaw.replace('/', '7');    
  const sales = salesRaw.split(' ')[2]
  const obj = {
    date: date, 
    sales: sales
  }
  return obj;
}


module.exports = {
  textProcessing,
  getSignUpInfo
}