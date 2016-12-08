var express = require('express')
var app = express()
var bodyparser = require('body-parser')
var path = require('path')
var Sequelize = require('sequelize')
const sequelizeConnection = require("./database")

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())
app.use(express.static('public'))



const Question = require('./models/question');
const Response = require('./models/response');

sequelizeConnection.sync().then(function() {
  app.listen(3000)
})

//GET all Questions
app.get('/api/question', (req, res) => {
	Question.findAll()
	.then( (questions) => {
		res.send(JSON.stringify(questions));
	})
	.catch( (err) => {
		console.log("Something went wrong while trying to fetch all Questions: ", err);
		res.sendStatus(500);
	});
});

//GET all Responses
app.get("/api/response", (req, res) => {
	Response.findAll({
		include: {all: true}
	})
	.then( (responses) => {
		res.send(responses);
	})
	.catch( (err) => {
		console.log("Something went wrong while trying to fetch all Responses: ". err);
		res.sendStatus(500);
	})
});


//POST new Question
app.post('/api/question', (req, res) => {
	Question.create({
		question: req.body.question,
		choice1: req.body.one,
		choice2: req.body.two,
		choice3: req.body.three,
		choice4: req.body.four
	})
	.then( (newQuestion) => {
		res.send(newQuestion);
	})
	.catch( (err) => {
		console.log("Something went wrong while creating new Question: ", err);
		res.sendStatus(500);
	});
});

//POST new Response
app.post("/api/response", (req, res) => {
	let newResponse;
	Response.create({
		choice: req.body.choice,
		questionId: req.body.id
	})
	.then( (response) => {
		newResponse = response;
		return Question.findById(response.questionId);
	})
	.then( (question) => {
		question.addResponses([newResponse.id]);
		res.send(newResponse);
	})
	.catch( (err) => {
		console.log("Something went wrong while trying to create a new Response: ", err);
		res.sendStatus(500);
	});
});


//Catch all non-defined GET requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})