var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/employer/signup", function(req, res) {
    res.render("employer/signup");
  });  

  // Load dashboard if user already loged in otherwise the login page
  app.get("/employer/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("employer/dashboard");
    }
    res.render("employer/login")
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/employer/dashboard", isAuthenticated, function(req, res) {
    res.render("employer/dashboard", {isAuthenticated: true});
  });

  app.get("/employer/addEmployee", isAuthenticated, function(req, res) {
    res.render("employer/addEmployee", {isAuthenticated: true});
  });

   // Route for logging user out
   app.get("/employer/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  /*-------------------------------employee----------------------------------*/

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