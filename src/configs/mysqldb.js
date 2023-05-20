const Sequalize = require('sequelize');


// Syntax for setting up a new connection 
// Sequalize (database_name, user_name, password, {dialect: database, host: host})

const sequalize = new Sequalize(
		'bookmyshow', 
		'root',
		'root@mysql',{
			dialect: 'mysql',
			host: 'localhost'
		});

// Check the connection to database - calling authenticate method

const connectToDB = async ()=>{
	try{

		sequalize.sync();
		await sequalize.authenticate();
		console.log("Successfully connected to the database.");
	}
	catch(error){
		console.log(error);
	}
}


module.exports = {sequalize, connectToDB}