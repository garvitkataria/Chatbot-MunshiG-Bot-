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

  var speech
  let sql = 'SELECT * FROM item';
  let query = db.query(sql, (err, results) => {
        if(err) throw err;
      

        if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.echoText)
        {
          speech = req.body.queryResult.parameters.echoText;
        }
        if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.outofstock)
        {
          for (var i = results.length - 1; i >= 0; i--) {
            if(results[i].cnt == 0)
            {
               console.log(results[i].itemName);
               console.log(results[i].categoryId);
               console.log(results[i].price);
            }
          }
        }
        else
        {
          speech = "Seems like some problem. Speak again.";
        }
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


});





restService.listen(process.env.PORT || 8073, function() {
  console.log("Server up and listening");
});
