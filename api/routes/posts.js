var PostModel = require('../models/model-post'); 
var CommentModel = require('../models/model-comment'); 
var express = require('express');
const { route } = require('./users');
var router = express.Router();

// create a new post
router.post('/create', (req, res) => {
  // req.body -> bad request
  if(!req.body) {
      return res.status(400).send('Request body missing');
  }
  let model = new PostModel(req.body);
  model.save()
      .then(doc => {
          // empty doc
          if(!doc || doc.length === 0) {
              return res.status(500).send("Error: Post not saved.");
          }
          // resource created
          res.status(201).json(doc);
      })
      .catch(err => {
          // catch and return error
          res.status(500).json(err);
      });
});

// update post
router.put('/update', (req, res) => {
  // no req.body -> error
  if(!req.query._id) {
    return res.status(400).send('Request body missing');
  }
  // return newly created obj
  PostModel.findByIdAndUpdate(req.query._id, req.body, {new : true})
  .then(doc => {
        // empty doc
        if(!doc || doc.length === 0) {
            return res.status(500).send("Error: Post not found.");
        }
        // resource created
        res.status(201).send(doc);
    })
    .catch(err => {
        // catch and return error
        res.status(500).json(err);
    });
});

// search post by username
router.get('/getbyusername', (req, res) => {
    if(!req.query.username) {
        return res.status(400).send("Missing URL parameter: username");
    }
    // find post
    PostModel.find({
        username: req.query.username
    })
    .then(doc => {
        if (!doc || doc.length === 0)
            res.status(500).send("Post not found");
        else
            res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
  });

// search post by course
router.get('/getbycourse', (req, res) => {
    if(!req.query.course) {
        return res.status(400).send("Missing URL parameter: course");
    }
    // find post
    PostModel.find({
        course: req.query.course
    })
    .then(doc => {
        if (!doc || doc.length === 0)
            res.status(500).send("Post not found");
        else
            res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
  });

//search post with key word
router.get('/search', (req,res) => {
    if (!req.body) {
        return res.status(400).send("Missing Request body");
    }
    //key word with reg exp
    var keyWord = new RegExp(req.query.body,'ix');
    PostModel.find({content: keyWord})
    .then(doc => {
        if (!doc || doc.length === 0)
            res.status(500).send("Post not found");
        else
            res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

// DELETE post
router.delete('/delete', (req, res) => {
  if(!req.query._id) {
      return res.status(400).send("Missing URL parameter: post ID");
  }
    // delete post
    PostModel.findOneAndDelete({_id: req.query._id})
    .then(post => {
        res.json({post: post, comments: comments});
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;