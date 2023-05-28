// Import the sequelize connection from config file 
// Import datatypes from the sequelize library

const sequalize = require('../configs/mysqldb').sequalize;
const DataTypes = require('sequelize');
const Movie_Shows=require('../models/movies_shows');


// Define the model by providing name of the table, it's columns, their datatypes and constraints.

const Movie_Orders = sequalize.define('Movie_Orders', {
	order_id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
    	primaryKey: true
	},
    cust_name: {
		type: DataTypes.STRING,
		allowNull:false
	},
	show_id: {
		type: DataTypes.BIGINT,
        references: {
           model: 'Movie_Shows', 
           key: 'show_id', 
        },
		allowNull:false
	},
    seat_no:{
        type:DataTypes.BIGINT,
        allowNull:false
    }
})

// Movie_Orders.hasMany(Movie_Shows);


// Execute the sync command to run migrations 
// sequalize.sync()

module.exports = Movie_Orders; 