const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
const mysql = require('mysql');
const db = mysql.createConnection({
    host     : 'itsdb.c4idvpseeifj.ap-south-1.rds.amazonaws.com',
    user     : 'its',
    password : 'itsproject',
    database : 'grocery',
    port : 3306
});
// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});


restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  console.log(req.body);
  console.log(req.body.queryResult.parameters.echoText);
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";
  console.log("speech",speech);
  return res.json(
  {
  "fulfillmentText": speech,
  "fulfillmentMessages": [
    {
      "text":{
        "text":[
          speech
        ]
      },
    }
  ],
}
);
});


restService.post("/notInStock", function(req, res) {
  console.log(req.body);
  console.log(req.body.queryResult.parameters.echoText);
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";
  console.log("speech",speech);
  return res.json(
  {
  "fulfillmentText": speech,
  "fulfillmentMessages": [
    {
      "text":{
        "text":[
          speech
        ]
      },
    }
  ],
}
);
});


restService.listen(process.env.PORT || 8072, function() {
  console.log("Server up and listening");
});
