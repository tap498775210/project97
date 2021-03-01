var express = require('express');
var router = express.Router();
var Question = require('../question.js');


// router.get('/', function(req, res, next) {
//     res.send('API is working properly');
// });

router.post('/', async (req, res, next) => {
    Question.QNA.addQuestion(req.body.word);  // add the question to the memory
    console.log("question: " + req.body.word);      // Debug: output the question to console
    res.send(Question.QNA.detail);
})



router.get('/', async (req, res, next) {
    //let everything = { title: 'Qiazza', something: Question.Questions.detail };//put everything into an object
    //res.render('questions', everything);//render it
    res.status(200);
    res.set("Access-Control-Allow-Origin", "*");
    res.send(Question.QNA.detail);
    console.log(Question.QNA.detail);
});

module.exports = router;