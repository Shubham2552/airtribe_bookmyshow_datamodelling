const express = require('express');
const router = express.Router();
const sequalize = require('../configs/mysqldb').sequalize;
const Movie = require('../models/movies');
const Movie_Show = require('../models/movies_shows');
const Slot = require('../models/slots');
const Theatre = require('../models/theatres');



//Route to create movie show entries
router.get('/create_show_entries', async(request, response) => {
	const movies = await Movie.findAll();
	const theatres = await Theatre.findAll();
	const slots = await Slot.findAll();


	
	Promise.all([movies, theatres, slots]).then(async (values) => {
		for(let l=1;l<=7;l++){
			for(let i=0;i<theatres.length;i++){
				for(let j=0;j<movies.length;j++){
					for(let k=0;k<slots.length;k++){
					
						const  movie_show = Movie_Show.build({
							theatre_id: theatres[j].theatre_id,
							movie_id:movies[i].movie_id,
							slot_id:slots[k].slot_id,
							day_of_show:l

						})

						await movie_show.save().catch(function(error){
							response.json(error);
						});

					}
					
					
				}
			}
		}

		response.setHeader('Content-Type', 'application/json');
		response.status(200).json("Successfully created all the entries");
	  }).catch(err => {
		response.setHeader('Content-Type', 'application/json');
		response.status(500).json({ error: err });
	  });
	
});

//Route to create two movies
router.get('/create_movies',async(request,response)=>{
	const movie = Movie.build({
		movie_name: "MovieA"
	})
	const movie2 = Movie.build({
		movie_name: "MovieB"
	})

	await movie.save().catch(function(error){
		response.json(error);
	});

	await movie2.save().catch(function(error){
		response.json(error);
	});
	response.send('Successfully added movies').status(200);
})

//Route to create two theatres
router.get('/create_theatres',async(request,response)=>{
	const theatre = Theatre.build({
		theatre_name: "Theatre_A"
	})
	const theatre2 = Theatre.build({
		theatre_name: "Theatre_B"
	})

	await theatre.save().catch(function(error){
		response.json(error);
	});

	await theatre2.save().catch(function(error){
		response.json(error);
	});

	response.send('Successfully added theatres').status(200);
})

//Route to create two time slots
router.get('/create_time_slots',async(request,response)=>{
	const slot = Slot.build({
		start_time: '10:00:00',
		end_time:'12:00:00'

	})
	const slot2 = Slot.build({
		start_time: '15:00:00',
		end_time:'17:00:00'
	})

	await slot.save().catch(function(error){
		response.json(error);
	});

	await slot2.save().catch(function(error){
		response.json(error);
	});

	response.send('Successfully created time slots').status(200);
})

//Route to get movie and theatre id
router.get('/movies', async(request, response) => {
	await sequalize.query(`SELECT s.start_time,t.day_of_show from Slots s left join ((SELECT slot_id,day_of_show  from Movie_Shows ms   WHERE (ms.movie_id  = (SELECT movie_id from Movies m where movie_name ='${request.query.movie}')) and (ms.theatre_id  = (SELECT theatre_id from Theatres t  where theatre_name ='${request.query.theatre}')))) t on s.slot_id =t.slot_id`).then((success)=>{
		response.status(200).json(success);
	}).catch((error)=>{
		response.json(error);
	})


});









module.exports = router;