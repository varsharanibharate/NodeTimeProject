const https = require("https");

//const PORT = process.env.PORT || 5000;

const server = https.createServer(async (req, res) => {
  //set the request route

  if (req.url === "/api" && req.method === "GET") {
    get("https://time.com/getTimeStories", function (data) {
      // do something with data
      var subStrRes = data.match(
        /\"most_popular_stories\":(.+),\"activate_countdown_clock/
      );

      finalResponse = getFinalJson(JSON.parse(subStrRes[1]));
      res.writeHead(200, { "Content-Type": "application/json" });

      res.write(finalResponse);
      console.log("Response Object: ", finalResponse);

      res.end();
    });
  }

  // If no route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(5000, () => {
  console.log("Server Running at http://localhost:5000");
});

function processWebData() {
  return https
    .get("https://time.com/getTimeStories", (resp) => {
      let data = "";

      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log("data of html: ", data.length);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

function get(url, callback) {
  "use-strict";
  https.get(url, function (result) {
    var dataQueue = "";
    result.on("data", function (dataBuffer) {
      dataQueue += dataBuffer;
    });
    result.on("end", function () {
      return callback(dataQueue);
    });
  });
}

function getFinalJson(jsonArray) {
  var jsArray = [];
  jsonArray.forEach((element) => {
    jsArray.push({ title: element.title, link: element.url });
  });

  var finalJson = JSON.stringify(jsArray);
  return finalJson;
}

function returnFinalResponse(callback) {
  get("https://time.com/getTimeStories", function (data) {
    // do something with data
    var subStrRes = data.match(
      /\"most_popular_stories\":(.+),\"activate_countdown_clock/
    );

    finalResponse = getFinalJson(JSON.parse(subStrRes[1]));
    return callback(finalResponse);
  });
}
