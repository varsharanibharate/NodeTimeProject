const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.listen(3000, () => {
  console.log("Server Running at http://localhost:3000/");
});

app.get("/article", async (request, response) => {
  let url = "https://time.com";
  let options = {
    method: "GET",
  };

  fetch(url, options)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      //statement-1
      console.log(jsonData);
    });
});
