require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var axios = require('axios');
var async = require('async');
var ocr = require('./ocrHelper');

// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

app.use(bodyParser.json()) // get req.body from client
app.use(express.static(__dirname + '/../react-client/dist'));

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.post('/', function(req, res) {
  var path = req.body.path 
  var alltext = [];
  var images = fs.readdirSync('/Users/kaoyubo/Desktop/folder')
  images.forEach(function(item, index) {
    if (item.indexOf('.jpg') == -1) {
      return; 
    } 

    var filePath = '/Users/kaoyubo/Desktop/folder/' + item;
    var imageFile = fs.readFileSync(filePath);
    var encoded = new Buffer(imageFile).toString('base64'); 
    var googleUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + process.env.GOOGEL_VISION_API_KEY; 
    console.log("ITEM:", item);
    console.log(alltext);
    
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
        var parsedText = response.data.responses[0].textAnnotations;
        alltext.push(parsedText[0].description);
        if (alltext.length == (images.length - 1)) {
          console.log(alltext);
          var dateAndSales = ocr.getSignUpInfo(alltext);
          console.log(dateAndSales);
          res.send(dateAndSales);
        }
      }) 
      .catch(function(error) {
        throw error; 
        console.log(error);
      })
  })
})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

