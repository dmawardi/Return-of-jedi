var db = require("../models");
var bcrypt = require("bcrypt");
var passport = require("../config/passport");
const saltRounds = 10;
var fs = require("fs");

module.exports = function(app) {
  // app.post("/api/login", function(req, res) {
  //   res.json(req.user);
  // });
  // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Register a new employer
  app.post("/api/register", (req, res) => {
    db.Employer.findOne({
      where: { employerEmail: req.body.employerEmail }
    }).then(function(employer) {
      if (employer) {
        res.send(false);
      } else {
        bcrypt.hash(req.body.employerPassword, saltRounds, function(err, hash) {
          db.Employer.create({
            employerEmail: req.body.employerEmail,
            employerName: req.body.employerName,
            employerPassword: hash,
            employerCompanyName: req.body.employerCompanyName
          })
            .then(function(dbEmployer) {
              console.log("))))))))))))))))))))))))))))))))))))))))))))");
              // res.redirect('/login')
              res.json(dbEmployer);
            })
            .catch(function(err) {
              res.status(401).json(err);
            });
        });
      }
    });
  });

  // emploer login
  app.post("/api/login", (req, res) => {
    // console.log(req.body.employerEmail)
    db.Employer.findOne({
      where: {
        employerEmail: req.body.employerEmail
      }
    }).then(function(employer) {
      if (!employer) {
        res.send(false);
        // res.redirect('/');
      } else {
        bcrypt.compare(
          req.body.employerPassword,
          employer.employerPassword,
          function(err, result) {
            if (err) {
              throw err;
            } else {
              res.send(result);
            }
          }
        );
      } //
    });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/employer_data", function(req, res) {
    console.log(
      "lkajsdlkjf;asd ;NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN",
      req
    );

    // if (!req.user) {
    //   // The user is not logged in, send back an empty object
    //   res.json({});
    // } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    // res.json({
    //   email: req.employer.employerEmail,
    //   id: req.employer.id
    // });
    // }
  });

  app.get("/api/employees", function(req, res) {
    db.Employee.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/employees", function(req, res) {
    db.Employee.create({
      employeeName: req.body.employeeName,
      employeeDepartment: req.body.employeeDepartment,
      employeePosition: req.body.employeePosition,
      employeeAddress: req.body.employeeAddress,
      employeeContactNumber: req.body.employeeContactNumber,
      employeeDOB: req.body.employeeDOB,
      employeeImage: req.body.employeeImage
    });

    res.status(204).end();
  });

  app.get("/api/timesheet", function(req, res) {
    db.Timesheet.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/timesheet", function(req, res) {
    db.Timesheet.create({
      employeeID: req.body.employeeID,
      employeeStatus: req.body.employeeStatus,
      geoLocation: req.body.geoLocation,
      check_in: req.body.check_in,
      check_out: req.body.check_out
    });

    res.status(204).end();
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
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
  app.get("/api/getFaceData/:id", function(req, res) {
    // Grab ID of user
    var idOfUser = req.params.id;
    var fs = require("fs");
    var path = require("path");
    console.log("reading file");
    // Read data file


    db.Employee.findOne({
      where: {
        id: idOfUser
      }
    }).then(function(data) {
      // Send back data contained within employee's image
      res.send(data.employeeImage);
    });
    // Previous Code
    // fs.readFile(path.join(__dirname, "../faceDB/facedb.txt"), "utf8", function(
    //   err,
    //   data
    // ) {
    //   if (err) {
    //     throw err;
    //   }
    //   // Print and return to user
    //   var faceToMatch = data;
    //   console.log(faceToMatch);
    //   res.send(faceToMatch);
    // });
  });

  // Create a new face
  app.post("/api/addNewFace/:id", function(req, res) {
    // Assign request body to facialModel
    var idOfUser = req.params.id;
    var facialModel = req.body;
    // Insert facial model into database
    db.Employee.update(
      {
        id: idOfUser
      },
      {
      employeeImage: JSON.stringify(facialModel)
    }).then(function(){
      // Send status 200
      res.sendStatus(200);
    }).catch(function(){
      // Send status 500
      res.sendStatus(500);
    });

    // Previous code
    // fs.writeFile("faceDB/facedb.txt", JSON.stringify(facialModel), function(
    //   error
    // ) {
    //   if (error) throw res.sendStatus(500);
    //   console.log("File save");
    // });
    // // Send completed connection status
    // res.sendStatus(200);


  });
};
