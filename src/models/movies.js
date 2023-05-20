// Import the sequelize connection from config file 
// Import datatypes from the sequelize library

const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Movie = sequalize.define('Movies', {
	movie_id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
    	primaryKey: true
	},
	movie_name: {
		type: DataTypes.STRING(100)
	}
})


// Execute the sync command to run migrations 
// sequalize.sync()

module.exports = Movie; 