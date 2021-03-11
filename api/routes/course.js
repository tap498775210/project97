var CourseModel = require('../models/model-course'); 
var express = require('express');
var router = express.Router();

// create a course
router.post('/create', (req, res) => {
  // req.body -> bad request
  if(!req.body) {
      return res.status(400).send('Request body missing');
  }
  let model = new CourseModel(req.body);
  model.save()
      .then(doc => {
          // empty doc
          if(!doc || doc.length === 0) 
            res.status(500).send("Course not saved.");
          // resource created
          else
            res.status(201).json(doc);
      })
      .catch(err => {
          // catch and return error
          res.status(500).json(err);
      });
});

// update course by id
router.put('/update', (req, res) => {
  // no req.body -> error
  if(!req.query._id) {
    return res.status(400).send('Missing URL parameter: id');
  }
  if(!req.body) {
    return res.status(400).send('Missing body');
  }
  // return newly created obj
  CourseModel.findByIdAndUpdate(req.query._id, req.body, {new : true})
  .then(doc => {
        // empty doc
        if(!doc || doc.length === 0) {
            res.status(500).send("Course not found.");
        }
        else
        // resource created
            res.status(201).json(doc);
    })
    .catch(err => {
        // catch and return error
        res.status(500).json(err);
    });
});

// get course
router.get('/get', (req, res) => {
    if(!req.query._id) {
        return res.status(400).send('Missing URL parameter: id');
    }
  CourseModel.find({_id: {
    $in: JSON.parse(req.query._id) }})
  .then(doc => {
    if(!doc || doc.length === 0)
        res.status(500).send("Course not found");
    else
        res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// get all courses
router.get('/getall', (req, res) => {
  CourseModel.find()
  .then(doc => {
    if(!doc || doc.length === 0)
        res.status(500).send("No course available so far");
    else
        res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// DELETE course
router.delete('/delete', (req, res) => {
  if(!req.query._id) {
      return res.status(400).send("Missing URL parameter: id");
  }
  // delete course
  CourseModel.findByIdAndDelete(req.query._id)
  .then(doc => {
    if(!doc || doc.length === 0)
        res.status(500).send("Course not found");
    else
        res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

module.exports = router;