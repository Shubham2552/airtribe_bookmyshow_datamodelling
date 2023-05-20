// Import the sequelize connection from config file 
// Import datatypes from the sequelize library

const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Movie_Show = sequalize.define('Movie_Shows', {
	show_id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
    	primaryKey: true
	},
	theatre_id: {
		type: DataTypes.BIGINT,
		allowNull:false
	},
	movie_id: {
		type: DataTypes.BIGINT,
		allowNull:false
	},
    slot_id: {
		type: DataTypes.BIGINT,
		allowNull:false
	},
    day_of_show: {
		type: DataTypes.BIGINT,
		allowNull:false
	},

})


// Execute the sync command to run migrations 
// sequalize.sync()

module.exports = Movie_Show; 