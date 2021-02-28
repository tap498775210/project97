var express = require('express');
var router = express.Router();
var Question = require('../question.js');

// router.get('/', function(req, res, next) {
//     res.send('API is working properly');
// });

router.get('/', function (req, res, next) {
    let everything = { title: 'Qiazza', something: Question.Questions.detail };//put everything into an object
    res.render('questions', everything);//render it
});

module.exports = router;