/*********************************************************************************
 * WEB322 – Assignment 4
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Sheetal singh Student ID: 167431212  Date: 19/06/2023
 *
 *
 ********************************************************************************/

var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
var path = require("path");

const {
  initialize,
  getPartTimers,
  getEmployeeByNum,
} = require("./modules/officeData");

// setup a 'route' to listen on the default url path

app.use(express.static("public"));

app.get("/PartTimer", (req, res) => {
  getPartTimers()
    .then((value) => res.send(JSON.stringify(value)))
    .catch((error) => res.send(JSON.stringify({ message: error })));
});
app.get("/employee/:num", (req, res) => {
  getEmployeeByNum(Number(req.params.num))
    .then((value) => res.send(JSON.stringify(value)))
    .catch((error) => res.send(JSON.stringify({ message: error })));
});
app.get("/PartTimer", (req, res) => {
  getPartTimers()
    .then((value) => res.send(JSON.stringify(value)))
    .catch((error) => res.send(JSON.stringify({ message: error })));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});
app.get("/audio", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/audio.html"));
});
app.get("/video", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/video.html"));
});
app.get("/table", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/table.html"));
});
app.get("/list", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/list.html"));
});
app.get("/storefront", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/storefront.html"));
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.use(express.urlencoded({ extended: true }));


// setup http server to listen on HTTP_PORT


initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
    });
  })
  .catch((error) => console.log(error));
