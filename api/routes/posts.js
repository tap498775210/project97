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
  console.log(req.body.title);
  let model = new PostModel(req.body);
  model.save()
      .then(doc => {
          // empty doc
          if(!doc || doc.length === 0) {
              return res.status(500).send("Post not saved.");
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
            return res.status(500).send("Post not found.");
        }
        // resource created
        res.status(201).send(doc);
    })
    .catch(err => {
        // catch and return error
        res.status(500).json(err);
    });
});

// temporary function
// get all posts
// Will use getbycourse when we can let the user to add courses
router.get('/gettem', (req, res) => {
    PostModel.find({})
        .sort({createdAt: -1})
        .then(doc => {
            // console.log(doc);
            if (!doc || doc.length === 0)
                res.status(500).send("Post not found");
            else
                res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Get specific post by post id
// Currently does not work, was just an idea
router.get('/getbypostid', (req, res) => {
    if(!req.query._id) {
        return res.status(400).send("Missing URL parameter: id");
    }
    // find post
    PostModel.findById(req.query._id)
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

// search post by user id
router.get('/getbyuser', (req, res) => {
    if(!req.query.user) {
        return res.status(400).send("Missing URL parameter: user");
    }
    // find post
    PostModel.find({
        user: req.query.user
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

// search post by course id sorted by creation date
router.get('/getbycoursecreate', (req, res) => {
    if(!req.query.course) {
        return res.status(400).send("Missing URL parameter: course");
    }
    // find post
    PostModel.find({
        course: req.query.course
    })
    .sort({createdAt: -1})
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

  // search post by course id sorted by update date
router.get('/getbycourseupdate', (req, res) => {
    if(!req.query.course) {
        return res.status(400).send("Missing URL parameter: course");
    }
    // find post
    PostModel.find({
        course: req.query.course
    })
    .sort({updatedAt: -1})
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
    if (!req.query.keyword) {
        return res.status(400).send("Missing Request body");
    }
    //key word with reg exp
    var keyWord = new RegExp(req.query.keyword);
    PostModel.find({ $or: [{title: keyWord},{content: keyWord}] })
    .sort({createdAt: -1})
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
router.delete('/deleteone', (req, res) => {
  if(!req.query._id) {
      return res.status(400).send("Missing URL parameter: post ID");
  }
    // delete post
    PostModel.findOneAndDelete({_id: req.query._id})
    .then(post => {
        res.json(post);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.delete('/deletemany', (req, res) => {
    if(!req.query._id) {
        return res.status(400).send("Missing URL parameter: post ID");
    }
      // delete post
      PostModel.deleteMany({_id: {
        $in: req.query._id }})
      .then(post => {
          res.json(post);
      })
      .catch(err => {
          res.status(500).json(err);
      });
  });

module.exports = router;