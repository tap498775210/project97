var express = require('express');
var router = express.Router();
var Question = require('../question.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Qiazza' });
});

router.post('/', async (req, res, next) => {
    Question.Questions.addQuestion(req.body.word);//add the question to the memoery
    let everything = { title: 'Qiazza', something: Question.Questions.detail };//put everything into an object
    res.render('index', everything);//render it
});

module.exports = router;
