/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Load the http module to create an http server.
var http = require('http');
var express = require('express')
var app = express()
var request = require('request');
var token =  ""//put token here
var bodyParser = require('body-parser');
var groupID = "22849215";

app.use(bodyParser.json());

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request");
   sendRequest(req, res);
   res.send('200');

});



var server = app.listen(process.env.PORT || 8081, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);


});

function sendRequest(req, res){
	var body = req.body.text;
	var reversed = reverseText(body);
    var message = {bot_id: '' //Bot id goes here,
                  text: reversed
              };
			  console.log(req.body.user_id);
	 if(req.body.user_id != '345869' && req.body.user_id != '11868228'){ //this checks if the user commented or the bot commented, to prevent infinite loop of comments
	   request({
			url: "https://api.groupme.com/v3/bots/post", //URL to hit
			method: 'POST',
			json: true,
			//Lets post the following key/values as form
			body: message
		}), function(error, response, body){
				console.log(body);
	};
	};

    };

function reverseText(text){
	var newString = "";
	for(var i = 0; i < text.length; i++){
		var newString = newString + text[text.length - 1 - i];

	}
	return newString;
}
