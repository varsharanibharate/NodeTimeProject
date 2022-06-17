var express = require("express");
var app = express();

var req = require("request");
const fs = require("fs");

function processTimeData() {
  req("https://time.com", function (error, response, body) {
    console.log("error:", error);
    console.log("statusCode:", response && response.statusCode);

    var htmlString = body;

    const testHtml =
      '<div class="most-popular-feed-wrapper"><div>test</div></div>';
    const result1 = testHtml.match(
      /<div class="most-popular-feed-wrapper">(.+)<\/div>/
    );
    console.log("Result1: ", result1[0]);

    console.log("HTML String: ", htmlString);
    const result = htmlString.match(/<div>(.+)<\/div>/);
    console.log("Result of Main: ", result[1]);
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
