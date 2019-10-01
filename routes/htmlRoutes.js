// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
      res.render("signup");
    // }
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
  });


  app.get("/login", function(req, res) {
    
    res.render("login");
    // If the user already has an account send them to the members page
    // if (req.user) {
    // res.render("login");

    // }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

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

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", /* isAuthenticated,*/ function(req, res) {
    res.render("dashboard");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
