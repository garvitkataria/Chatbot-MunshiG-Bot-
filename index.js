"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

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
  // {
  //   "speech": speech,
  //   "displayText": speech,
  //   "source": "webhook-echo-sample",
  //   "fulfillmentText": speech,

  // }

  {
  "fulfillmentText": speech,
  "fulfillmentMessages": [
    {
      "text":{
        "text":[
          speech
        ]
      },
      // "card": {
      //   "title": "card title",
      //   "subtitle": "card text",
      //   "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
      //   "buttons": [
      //     {
      //       "text": "button text",
      //       "postback": "https://assistant.google.com/"
      //     }
      //   ]
      // }
    }
  ],
}

  );
});


restService.listen(process.env.PORT || 8001, function() {
  console.log("Server up and listening");
});
