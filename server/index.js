require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var axios = require('axios');
var ocr = require('./ocrHelper');

var app = express();
app.use(bodyParser.json()) // get req.body from client
app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/', function(req, res) {
  var path = req.body.path;
  var infoArray = [];
  var images = fs.readdirSync(path);
  
  for (var i = 0; i < images.length; i++) {

    if (images[i].indexOf('.jpg') == -1) {
      continue;
    }

    var filePath = path + images[i];
    var imageFile = fs.readFileSync(filePath);
    var encoded = new Buffer(imageFile).toString('base64'); 
    var googleUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.GOOGEL_VISION_API_KEY; 
    console.log("ITEM:", images[i]);

    axios({
      method: 'post',
      url: googleUrl,
      data: {
        "requests": [
          { 
            "image": {
              "content": encoded
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
        var rawData = response.data.responses[0].textAnnotations;
        var rawText = rawData[0].description;
        var dateAndSales = ocr.getSignUpInfo(rawText);
        infoArray.push(dateAndSales);

        // send response after all receipts parsed
        if (infoArray.length == images.length-1) {
          res.send(infoArray);
        }
      }) 
      .catch(function(error) {
        throw error; 
        console.log(error);
      })

  }

})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

