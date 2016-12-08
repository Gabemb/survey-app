const Sequelize = require('sequelize');
const sequelizeConnection = require("../database.js");

const Question = sequelizeConnection.define('question', {
	question: {
		type: Sequelize.STRING,
		min: 10,
		notEmpty: true
	},
	choice1: {
		type: Sequelize.STRING,
		len: [1, 50],
		notEmpty: true
	},
	choice2: {
		type: Sequelize.STRING,
		len: [1, 50],
		notEmpty: true
	},
	choice3: {
		type: Sequelize.STRING,
		len: [1, 50],
		notEmpty: true
	},
	choice4: {
		type: Sequelize.STRING,
		len: [1, 50],
		notEmpty: true
	}
})

module.exports = Question;