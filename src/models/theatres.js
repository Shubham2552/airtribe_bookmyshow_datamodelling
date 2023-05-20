// Import the sequelize connection from config file 
// Import datatypes from the sequelize library

const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');

// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Theatre = sequalize.define('Theatres', {
	theatre_id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
    	primaryKey: true
	},
	theatre_name: {
		type: DataTypes.STRING,
		allowNull: false
	}
})



// Execute the sync command to run migrations 
// sequalize.sync()

module.exports = Theatre 