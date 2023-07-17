/*********************************************************************************
 * WEB322 – Assignment 5
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Sheetal singh Student ID: 167431212  Date: 16/07/2023
 *
 *
 ********************************************************************************/
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const data = require("./modules/officeData.js");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));

app.get("/employees", (req, res) => {
  data.getAllEmployees()
    .then((data) => {
      if (data.length === 0) {
        res.render("employees", { message: "no results" });
      } else {
        res.render("employees", { employees: data });
      }
    })
    .catch(() => {
      res.render("employees", { message: "no results" });
    });
});

app.get("/employees/add", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "addEmployee.html"));
});

app.post("/employees/add", (req, res) => {
  data.addEmployee(req.body)
    .then(() => {
      res.redirect("/employees");
    })
    .catch(() => {
      res.redirect("/employees");
    });
});

app.get("/description", (req, res) => {
  res.render("description");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

data.initialize()
  .then(function () {
    app.listen(HTTP_PORT, function () {
      console.log("app listening on: " + HTTP_PORT);
    });
  })
  .catch(function (err) {
    console.log("unable to start server: " + err);
  });
