// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/register"));

    // db.Example.findAll({}).then(function(dbEmployee) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbEmployee
    //   });
    // });
  });

  app.get("/dashboard", function (req, res) {

    app.get("/dashboard", isAuthenticated, function (req, res) {
      res.sendFile(path.join(__dirname, "../public/dashboard"));
    });

    // res.render("dashboard", {
    //   msge: "welcome"
    // });
    // db.Employee.findAll({}).then(function(dbEmployee) {
    //   res.render("dashboard", {
    //     msg: "Welcome!",
    //     examples: dbEmployee
    //   });
    // });
  });

  // Load register page
  app.get("/register", function (req, res) {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname, "../public/register"));
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("register", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load register page
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));

    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("login", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Face Recognition Pages
  // Load webcam page
  app.get("/webcam", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("webCamCapture", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load checkin page
  app.get("/checkin", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("webCamCheckIn", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};