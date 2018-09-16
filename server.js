// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:dateString", function (req, res) {
  const timestamp = req.params.dateString;
  let date = new Date();
  
  if(timestamp) {
      if(isNaN(Number(timestamp))){
        date = new Date(timestamp);
      }else{
        date = new Date(Number(timestamp));
      }
      
      if(isNaN(date.getTime())){
       return res.json({'error': 'Invalid Date'});
      }      
  }
  
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});