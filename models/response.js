const Sequelize = require('sequelize');
const sequelizeConnection = require("../database.js");

const Question = require('./question');

const Response = sequelizeConnection.define('response', {
	choice: {
		type: Sequelize.STRING,
		len: [1, 50],
		notEmpty: true
	}
});

Response.belongsTo(Question);
Question.belongsToMany(Response, {through: "question-responses"});


module.exports = Response;