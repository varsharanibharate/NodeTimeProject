var express = require("express");
var app = express();

var req = require("request");
const fs = require("fs");

function processTimeData() {
  req("https://time.com", function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

    var htmlString = JSON.stringify(body);

    const link = document.querySelector("a");

    console.log(link);
  });
}

app.get("/listUsers", function (req, res) {
  processTimeData();
});

/*
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
*/

app.listen(3000, () => console.log("Server Running at http://localhost:3000"));
