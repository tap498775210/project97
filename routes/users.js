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

  let model = new UserModel(req.body);
  model.save()
      .then(doc => {
          if(!doc || doc.length === 0) {
              return res.status(500).send(doc);
          }

          // resource created
          res.status(201).send(doc);
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
  // store request body
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
        if(isMatch) {
          res.json(username);
        }
        // no match -> send empty response
        else {
          res.json({});
        }
      });
    }
    // no user found -> send empty response
    else {
      res.json({});
    }
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// GET (username and ID)
router.get('/', (req, res) => {
  if(!req.query.username) {
      return res.status(400).send("Missing URL parameter: username");
  }
  UserModel.findOne({
      username: req.query.username
  }, { username:1, _id:1 })
  .then(doc => {
      res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// UPDATE user
router.put('/', (req, res) => {
  if(!req.query.username) {
      return res.status(400).send("Missing URL parameter: username");
  }
  // return newly created obj
  UserModel.findOneAndUpdate({
      username: req.query.username
  }, req.body, {
      new: true
  })
  .then(doc => {
      res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// DELETE user
router.delete('/', (req, res) => {
  if(!req.query.username) {
      return res.status(400).send("Missing URL parameter: username");
  }
  // Delete the matching user (user's posts and comments are still kept)
  UserModel.findOneAndDelete({
      username: req.query.username
  })
  .then(doc => {
      res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

module.exports = router;