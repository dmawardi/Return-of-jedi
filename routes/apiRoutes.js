var db = require("../models");
var fs = require('fs');

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });



  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });

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

  // Create a new example
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