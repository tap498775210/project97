/*
USERS: process user login and profile
*/
var UserModel = require('../models/model-user')
var express = require('express');
var router = express.Router();

// create a new user
router.post('/register', (req, res) => {
  // req.body -> bad request
  if(!req.body) {
      return res.status(400).send('Request body missing');
  }
  // create model
  let model = new UserModel(req.body);
  model.save()
      .then(doc => {
          if(!doc || doc.length === 0) 
              return res.status(500).send(doc);
          // resource created
          res.status(201).send({_id : doc._id, name: doc.name, username : doc.username});
      })
      .catch(err => {
          // catch and return error
          res.status(500).json(err);
      });
});

// login
router.post('/login', (req, res) => {
  // no req.body -> error
  if(!req.body) {
    return res.status(400).send('Request body missing');
  }
  // find user with matching username
  const { username, password } = req.body;
  UserModel.findOne({
    username: username
  })
  .then(user => {
    // user found -> compare password
    if (user) {
      user.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
        // password match -> send username
        if(isMatch) 
          res.json({_id : user._id, name: user.name, username : user.username});
        // no match -> send empty response
        else 
          res.json(null);
      });
    }
    // no user found -> send empty response
    else 
      res.json(null);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// GET (id, name, username)
router.get('/get', (req, res) => {
  if(!req.query.username) {
      return res.status(400).send("Missing URL parameter: username");
  }
  // find user with matching username
  UserModel.findOne({
      username: req.query.username
  })
  .then(user => {
    if (user)
      res.json({_id : user._id, name: user.name, username : user.username});
    else
      res.json(null);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// UPDATE user (return id, name, username)
router.put('/update', (req, res) => {
  if(!req.query.username) {
      return res.status(400).send("Missing URL parameter: username");
  }
  // find user with matching username
  UserModel.findOneAndUpdate({
      username: req.query.username
  }, req.body, {
      new: true
  })
  .then(user => {
    if (user)
      res.json({_id : user._id, name: user.name, username : user.username});
    else
      res.json(null);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// DELETE user (return all info)
router.delete('/delete', (req, res) => {
  if(!req.query.username) {
      return res.status(400).send("Missing URL parameter: username");
  }
  // Delete the matching user (user's posts and comments are still kept)
  UserModel.findOneAndDelete({
      username: req.query.username
  })
  .then(user => {
      res.json(user);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

module.exports = router;