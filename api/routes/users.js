/*
USERS: process user login and profile
*/
var UserModel = require('../models/model-user')
var express = require('express');
var router = express.Router();

// create a new user
// success: return (id, name, username)
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
            res.status(500).send("Failed to save user");
          else
            res.status(201).send({_id : doc._id, name: doc.name, username : doc.username});
      })
      .catch(err => {
          // catch and return error
          res.status(500).json(err);
      });
});

// login
// success: return (id, name, username)
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
  .then(doc => {
    // user found -> compare password
    if (doc) {
      doc.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
        // password match -> send username
        if(isMatch) 
          res.json({_id : doc._id, name: doc.name, username : doc.username});
        // no match -> send empty response
        else 
          res.status(500).send("Incorrect password");
      });
    }
    // no user found -> send empty response
    else 
      res.status(500).send("Incorrect username");
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// GET user by id 
// return (id, name, username)
router.get('/get', (req, res) => {
  if(!req.query._id) {
    return res.status(400).send('Missing URL parameter: id');
  }
  // find user with matching username
  UserModel.findById(req.query._id, req.body, {new : true})
  .then(doc => {
    if(!doc || doc.length === 0) 
      res.status(500).send("User no found");
    else
      res.json({_id : doc._id, name: doc.name, username : doc.username});
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// UPDATE user by id
// return (id, name, username)
router.put('/update', (req, res) => {
  if(!req.query._id) {
    return res.status(400).send('Missing URL parameter: id');
  }
  if(!req.body) {
    return res.status(400).send('Missing body');
  }
  // return newly created obj
  UserModel.findOneAndUpdate({_id: req.query._id}, req.body, {new : true})
  .then(doc => {
    if(!doc || doc.length === 0) 
      res.status(500).send("User not found");
    else
      res.json({_id : doc._id, name: doc.name, username : doc.username});
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

// DELETE user by id (return all info)
router.delete('/delete', (req, res) => {
  if(!req.query._id) {
    return res.status(400).send('Missing URL parameter: id');
  }
  // return newly created obj
  UserModel.findOneAndDelete({_id: req.query._id})
  .then(doc => {
    if(!doc || doc.length === 0) 
      res.status(500).send("User no found");
    else
      res.json(doc);
  })
  .catch(err => {
      res.status(500).json(err);
  });
});


module.exports = router;