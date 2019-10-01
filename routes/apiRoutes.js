var db = require("../models");
var bcrypt = require('bcrypt');
var passport = require("../config/passport");
const saltRounds = 10;

module.exports = function (app) {
  // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Register a new employer
  app.post("/api/employerRegister", (req, res) => {

    db.Employer.findOne({
      where: {
        employerEmail: req.body.employerEmail
      }
    }).then(function (employer) {
      if (employer) {
        return done(null, false, {
          message: 'That email is already taken'
        });

      } else {
        bcrypt.hash(req.body.employerPassword, saltRounds, function (err, hash) {
          db.Employer.create({
            employerEmail: req.body.employerEmail,
            employerName: req.body.employerName,
            employerPassword: hash,
            employerCompanyName: req.body.employerCompanyName
          }).then(function (data) {
            res.redirect(307, "/api/login");
          }).catch((function (err) {
            res.status(401).json(err);
          }));
        });
      }

    });
  });

  // emploer login
  app.post('/api/login', (req, res) => {

    db.Employer.findOne({
      where: {
        employerEmail: req.body.employerEmail
      }
    }).then(function (employer) {
      if (!employer) {
        res.redirect('/');
      } else {
        bcrypt.compare(req.body.employerPassword, employer.employerPassword, function (err, result) {
          if (err) {
            throw err
          } else {
            res.send(result);
          }
        });
      }
    });
  });


  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function (req, res) {
  //   db.Example.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // API Routes for face recognition
  // API route for getting user's face model
  app.get("/api/getCompanyFaceData", function(req, res) {
    var fs = require("fs");
    var path = require("path");
    console.log("reading file");
    // Read data file

    // Grab user's data
    fs.readFile(path.join(__dirname, "../faceDB/facedb.txt"), 'utf8', function (err, data) {
      if (err) {
        throw err;
      }
      // Print and return to user
      var faceToMatch = data;
      console.log(faceToMatch);
      res.send(faceToMatch);
    });

  });

  // Create a new face
  app.post("/api/addNewFace", function(req, res) {
    // Assign request body to facialModel
    var facialModel = req.body;
    // Insert facial model into database
    fs.writeFile("faceDB/facedb.txt", JSON.stringify(facialModel), function(error) {
      if (error) throw res.sendStatus(500);
      console.log("File save");
    });
    // Send completed connection status
    res.sendStatus(200);
  });

};
