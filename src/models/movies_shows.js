// Import the sequelize connection from config file 
// Import datatypes from the sequelize library

const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');
const Theatre = require('../models/theatres');
const Movie = require('../models/movies');
const Slot = require('../models/slots');


// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Movie_Show = sequalize.define('Movie_Shows', {
	show_id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
    	primaryKey: true
	},
	theatre_id: {
		type: DataTypes.BIGINT,
		allowNull:false,
		references: {
			model: 'Theatres', 
			key: 'theatre_id', 
		 },
	},
	movie_id: {
		type: DataTypes.BIGINT,
		allowNull:false,
		references: {
			model: 'Movies', 
			key: 'movie_id', 
		 },
		
	},
    slot_id: {
		type: DataTypes.BIGINT,
		allowNull:false,
		references: {
			model: 'Slots', 
			key: 'slot_id', 
		 },
	},
    day_of_show: {
		type: DataTypes.BIGINT,
		allowNull:false
	},	show_language:{
		type: DataTypes.STRING(25),
		allowNull:false
	},
	format:{
		type: DataTypes.STRING(10),
		allowNull:false
	},
	genre:{
		type: DataTypes.STRING(25),
		allowNull:false
	}

})



// Execute the sync command to run migrations 
// sequalize.sync()

module.exports = Movie_Show; 