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
  let obj = {};
  const dateIndex = str.indexOf('Date Time'); 
  const salesIndex = str.indexOf('Sales Associate'); 
  
  if (dateIndex > -1 && salesIndex > -1) {
    const dateRaw = str.slice(dateIndex, dateIndex + 35);
    const dateFormat = /\d\d-\D\D\D-\d\d/;
    const parseDate = dateRaw.match(dateFormat);
    
    if (parseDate) {
      const date = parseDate[0]; 
      obj.date = date;
    } else {
      obj.date = 'N/A';
    }
    
    let salesRaw = str.slice(salesIndex, salesIndex + 25); 
    salesRaw = salesRaw.replace('/', '7');    
    const sales = salesRaw.split(' ')[2];
    if (sales) {
      obj.sales = sales;
    } else {
      obj.sales = 'N/A';
    }
    
  } else {
    return {"date": 'API Read Error', "sales": 'API Read Error'};
  }

  return obj;
}


module.exports = {
  textProcessing,
  getSignUpInfo
}