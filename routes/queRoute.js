var express = require('express');
var router = express.Router();
var Question = require('../question.js')

/* GET home page. */
router.get('/', function (req, res, next) {
    let everything = { title: 'Qiazza', something: Question.Questions.detail };//put everything into an object
    res.render('questions', everything);//render it
});

module.exports = router;
