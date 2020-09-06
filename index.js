var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var app = express();
var port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

var solutions = [];

app.get('/getTriviaQuestion', function(req, res) {
	fetch("https://opentdb.com/api.php?amount=1")
		.then(response => response.json())
		.then(data => {
			var answers = [];
			var answer = data.results[0].correct_answer
			var question = data.results[0].question;
			solutions.push({questionKey: question, answerKey: answer});
			answers.push(data.results[0].correct_answer);
			for (var i = 0; i < data.results[0].incorrect_answers.length; i++) {
			answers.push(data.results[0].incorrect_answers[i])};
			data.results[0].answers = answers;
			delete data.results[0].incorrect_answers;
			delete data.results[0].correct_answer;			
			res.status(200).send(data);
	});
});

app.post("/checkanswer", function(req, res) {
	var answer = req.body.answer;
	var question = req.body.question;
	var correction = "blob";
	console.log({givenQuestion: question, givenAnswer: answer});
	console.log(solutions);
	console.log(answer);
	var solLength = solutions.length
	for (i = 0; i < solLength; i++) {
		if (solutions[i].questionKey == question) {
			if (solutions[i].answerKey == answer) {
				correction = "true";
				console.log(correction);
			} else {
				correction = "false";
				console.log(correction);
			}
		}
	};
	res.status(200).send(correction);
});

app.listen(port, function () {
    console.log("Server running on port " + port + ".");
});