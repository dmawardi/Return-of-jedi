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
  // API route for getting data
  app.get("/api/getCompanyFaceData", function (req, res) {
    var fs = require("fs");
    var path = require("path");
    console.log("reading file");
    // Read data file
    fs.readFile(path.join(__dirname, "../public/js/appmodels/facedb.txt"), 'utf8', function (err, data) {
      if (err) {
        console.log(err);
      }
      // Print and return to user
      console.log(data);
      res.send(data);
    });

  });

  // Create a new example
  app.post("/api/addNewFace", function(req, res) {
    console.log("someone is sending a post");
    // console.log(req.body);
    var facialModel = extractNewFace(req.body);
    console.log(facialModel);
    fs.writeFile("faceDB/facedb.txt", JSON.stringify(facialModel), function(error){
      if (error) throw error;
      console.log("File save");
    });
    res.json(req.body);
  });

  function extractNewFace(data) {
    var faceObject = {
      name: data.name,
      jawOutline: JSON.parse(data.jawOutline),
      nose: JSON.parse(data.nose),
      mouth: JSON.parse(data.mouth),
      leftEye: JSON.parse(data.leftEye),
      rightEye: JSON.parse(data.rightEye),
      leftEyeBbrow: JSON.parse(data.leftEyeBbrow),
      rightEyeBrow: JSON.parse(data.rightEyeBrow)
    };
    return faceObject;
  }
};
