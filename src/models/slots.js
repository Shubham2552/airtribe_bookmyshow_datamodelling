// Import the sequelize connection from config file 
// Import datatypes from the sequelize library

const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');
const Movie_Show=require('../models/movies_shows')
// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Slot = sequalize.define('Slots', {
	slot_id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
    	primaryKey: true
	},
	start_time: {
		type: DataTypes.TIME,
        allowNull:false
	},
	end_time: {
		type: DataTypes.TIME,
        allowNull:false
	}
});





// Execute the sync command to run migrations 
// sequalize.sync()

module.exports = Slot; 