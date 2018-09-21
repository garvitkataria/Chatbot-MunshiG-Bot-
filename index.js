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
  var speech;
  let sql = 'SELECT * FROM item';
  let query = db.query(sql, (err, results) => {
        if(err) throw err;
        

        if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.echoText)
        {
          speech = req.body.queryResult.parameters.echoText;
           return res.json(
              {
              "fulfillmentText": [speech],
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
        }
        else if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.stockCount)
        {
          if(req.body.queryResult.parameters.stockCount == 'out of stock')
          {
            speech="The Items out of stock are: "
            for (var i = results.length - 1; i >= 0; i--) {
              if(results[i].cnt == 0)
              {
                 console.log(results[i].itemName);
                 console.log(results[i].categoryId);
                 console.log(results[i].price);
                 speech += results[i].itemName+' ';
              }
            }
             return res.json(
              {
              "fulfillmentText": [speech],
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
          } 
          else if(req.body.queryResult.parameters.stockCount == 'low stock count')
          {
            speech="Items with low stock count are: \n\n ";
            for (var i = results.length - 1; i >= 0; i--) {
              if(results[i].cnt <= 20)
              {
                 console.log(results[i].itemName);
                 console.log(results[i].categoryId);
                 console.log(results[i].price);
                 speech += results[i].itemName+' '+results[i].cnt+'\n';
              }
            }
          }
           return res.json(
              {
              "fulfillmentText": [speech],
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
        }
        else if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.itemName && req.body.queryResult.parameters.itemType)
        {
          console.log(req.body.queryResult.parameters.itemType);
          console.log(req.body.queryResult.parameters.itemName);
          if(req.body.queryResult.parameters.itemType == 'count')
          {
            console.log(req.body.queryResult.parameters.itemType);
            console.log(req.body.queryResult.parameters.itemName);
            for (var i = results.length - 1; i >= 0; i--) {
              console.log(results[i].itemName);
              if(results[i].itemName.toLowerCase() == req.body.queryResult.parameters.itemName.toLowerCase())
              {
                 console.log(results[i].itemName);
                 console.log(results[i].categoryId);
                 console.log(results[i].price);
                 speech="Stock count of "+results[i].itemName+" is "+results[i].cnt;
              }
            }
             return res.json(
              {
              "fulfillmentText": [speech],
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
          }
          else  if(req.body.queryResult.parameters.itemType == 'price')
          {
              for (var i = results.length - 1; i >= 0; i--) 
              {
                if(results[i].itemName.toLowerCase() == req.body.queryResult.parameters.itemName.toLowerCase())
                {
                   console.log(results[i].itemName);
                   console.log(results[i].categoryId);
                   console.log(results[i].price);
                   speech="Price of "+results[i].itemName+" is "+results[i].price;
                }
              }
            
          }
           return res.json(
              {
              "fulfillmentText": [speech],
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
        }
        else if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.category=="category")
        {
          speech="All categories are:";
           let sql = 'SELECT * FROM category';
            let query = db.query(sql, (err, categoryIdResults) => {
            if(err) throw err;
            for (var i = categoryIdResults.length - 1; i >= 0; i--) 
            {
              console.log(categoryIdResults[i].category);
              speech += categoryIdResults[i].category+', ';
            }
            console.log(speech);
             return res.json(
              {
              "fulfillmentText": [speech],
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
        }
         else if(req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.category)
        {
          id="";
          speech="Items of this category are:";
           let sql = 'SELECT * FROM category';
            let query = db.query(sql, (err, categoryIdResults) => {
            if(err) throw err;
            for (var i = categoryIdResults.length - 1; i >= 0; i--) 
            {
              if(categoryIdResults[i].category==req.body.queryResult.parameters.category)
              {
                 id=categoryIdResults[i].categoryId;
              }
            }
            for (var i = results.length - 1; i >= 0; i--) 
            {
              if(results[i].categoryId==id)
              {
                  console.log(results[i].itemName);
                  speech += results[i].itemName+', ';
              }
            }
            console.log(speech);
         }); 
             return res.json(
              {
              "fulfillmentText": [speech],
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
        } 
        else
        {
          speech = "Seems like some problem. Speak again.";
           return res.json(
              {
              "fulfillmentText": [speech],
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
        }
        

    });


});





restService.listen(process.env.PORT || 8077, function() {
  console.log("Server up and listening");
});
