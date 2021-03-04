var PostModel = require('../models/model-post'); 
var CommentModel = require('../models/model-comment'); 
var express = require('express');
var router = express.Router();

// create a new comment
router.post('/create', (req, res) => {
  // req.body -> bad request
  if(!req.body) {
      return res.status(400).send('Request body missing');
  }
  let model = new CommentModel(req.body);
  model.save()
      .then(doc => {
          // empty doc
          if(!doc || doc.length === 0) {
              return res.status(500).send("Error: Comment not saved.");
          }
          // resource created
          res.status(201).send(doc);
      })
      .catch(err => {
          // catch and return error
          res.status(500).json(err);
      });
});

// update comment
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

// search comment
router.get('/get', (req, res) => {
  if(!req.query.username) {
      return res.status(400).send("Missing URL parameter: username");
  }
  UserModel.findOne({
      username: req.query.username
  }, { username:1, _id:0 })
  .then(doc => {
      res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// DELETE comment
router.delete('/delete', (req, res) => {
  if(!req.query._id) {
      return res.status(400).send("Missing URL parameter: comment ID");
  }
    // delete post
    PostModel.findByIdAndDelete(req.query._id)
    .then(post => {
        res.json({post: post, comments: comments});
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;