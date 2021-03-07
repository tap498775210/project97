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
              return res.status(500).send("Comment not saved.");
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
  CommentModel.findByIdAndUpdate(req.query._id, req.body, {new : true})
  .then(doc => {
        // empty doc
        if(!doc || doc.length === 0) {
            return res.status(500).send("Comment not found.");
        }
        // resource created
        res.status(201).send(doc);
    })
    .catch(err => {
        // catch and return error
        res.status(500).json(err);
    });
});

// search comment by user id
router.get('/getbyuser', (req, res) => {
  if(!req.query.user) {
      return res.status(400).send("Missing URL parameter: user");
  }
  CommentModel.find({
      user: req.query.user
  })
  .then(doc => {
      res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// search comment by post id by creation date
router.get('/getbypostcreate', (req, res) => {
    if(!req.query.post) {
        return res.status(400).send("Missing URL parameter: post");
    }
    CommentModel.find({
        post: req.query.post
    })
    .sort({createdAt: -1})
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
  });

  // search comment by post id by update date
router.get('/getbypostupdate', (req, res) => {
    if(!req.query.post) {
        return res.status(400).send("Missing URL parameter: post");
    }
    CommentModel.find({
        post: req.query.post
    })
    .sort({updatedAt: -1})
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
    CommentModel.findOneAndDelete({_id: req.query._id})
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;