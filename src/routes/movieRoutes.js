const express = require('express');
const router = express.Router();
const sequalize = require('../configs/mysqldb').sequalize;
const Movie = require('../models/movies');
const Movie_Show = require('../models/movies_shows');
const Slot = require('../models/slots');
const Theatre = require('../models/theatres');
const Movie_Orders=require('../models/movie_orders');
const { TIME, where } = require('sequelize');
const redisClient = require('../configs/redis').redisClient;

//Route to create movie show entries
router.get('/create_show_entries', async(request, response) => {


	const movies = await Movie.findAll();
	const theatres = await Theatre.findAll();
	const slots = await Slot.findAll();

	const languages=['Hindi','English','Tamil','Kannada'];
	const formats=['2D','3D','IMAX'];
	
	Promise.all([movies, theatres, slots]).then(async (values) => {
		for(let n=1;n<=7;n++){
			for(let i=0;i<theatres.length;i++){
				for(let j=0;j<movies.length;j++){
					for(let k=0;k<slots.length;k++){
						for(let l=0;l<languages.length;l++){
							for(let m=0;m<formats.length;m++){	
							const  movie_show = Movie_Show.build({
							theatre_id: theatres[j].theatre_id,
							movie_id:movies[i].movie_id,
							slot_id:slots[k].slot_id,
							day_of_show:n,
							show_language:languages[l],
							format:formats[m]})

							await movie_show.save().catch(function(error){
								response.json(error);   
							});
						}
					}

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
		movie_name: "Avengers",
		cast:['Robert Downey Junior','Chris Evans','Tom Holland'],
		crew:['Chris Hemsworth','Mark Ruffalo'],
		movie_plot:'Saving the world from attack of aliens',
		runtime:'02:00:00',
		language:['Hindi','English','Tamil','Kannada'],
		genre:['Sci-fi','Action'],
		formats:['2D','3D','IMAX'],
		ratings:['4.5'],
		comments:['Good movie']

	})
	const movie2 = Movie.build({
		movie_name: "Avengers2",
		cast:['Robert Downey Junior','Chris Evans','Tom Holland'],
		crew:['Chris Hemsworth','Mark Ruffalo'],
		movie_plot:'Saving the world from attack of aliens',
		runtime:'02:00:00',
		language:['Hindi','English','Tamil','Kannada'],
		genre:['Sci-fi','Action'],
		formats:['2D','3D','IMAX'],
		ratings:['4.5'],
		comments:['Good movie']
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

//Route to get showid,movie and theatre id
router.get('/movies', async(request, response) => {


	 redisClient.hGetAll('info').then(async(success)=>{
		console.log(success)
		if(success.movie  == request.query.movie && success.theatre==request.query.theatre){
			console.log('Cache hit');
			 redisClient.get('result').then(success=>response.status(200).send(JSON.parse(success)))

		}
	else{
		await sequalize.query(`SELECT t.show_id,s.start_time,t.day_of_show from Slots s left join ((SELECT show_id,slot_id,day_of_show  from Movie_Shows ms   WHERE (ms.movie_id  = (SELECT movie_id from Movies m where movie_name ='${request.query.movie}')) and (ms.theatre_id  = (SELECT theatre_id from Theatres t  where theatre_name ='${request.query.theatre}')))) t on s.slot_id =t.slot_id`, {type: sequalize.QueryTypes.SELECT}).then(async(success)=>{
			// console.log(success);
			
			await redisClient.set('result',JSON.stringify(success))
			await redisClient.hSet('info',{
				'movie':request.query.movie,
				'theatre':request.query.theatre
			});
	
			
			response.status(200).json(success);
		}).catch((error)=>{
			response.json(error);
		})
	

	}})

});

	//route to retrive movie data faster with 'movie' passesd as query
router.get('/get_quick_data',async (request,response)=>{
		
		
	try{
		// throw error;
		await redisClient.get('movies').then((success)=>{
			// console.log(success)
			if(success!=undefined){
				success=JSON.parse(success);
			
				for(let i=0;i<success.length;i++){
					if(request.query.movie==success[i].movie_name) 
					{
						console.log('Cache hit');
						response.status(200).send(success[i]);
					}
				}
				// throw error;
				
			}
			// throw error;
		
		})
	}catch(err){
		try
		{
			const movies=await Movie.findAll();
				await redisClient.set('movies',JSON.stringify(movies)).then(()=>{
					for(let i=0;i<movies.length;i++){
						if(request.query.movie==movies[i].movie_name) 
						{
							console.log('getting data from database');
							response.status(200).send(movies[i]);
						}
					}
				})
		}catch(error){
			return response.status(404).send('Movie not found');
		}
		
	}
})


//route to store and retrive rating
router.post('/rating_comment',async(request,response)=>{
	const {id,comment,rating}=request.body;
	await Movie.findOne(
		{
			attributes: ['comments', 'ratings'],
			where:{
				movie_id:id
			}
		}).then(async(success)=>{
			await Movie.update({
				ratings: [...success.ratings,rating],
				comments:[...success.comments,comment]
			  }, {
				where: {
				  movie_id:parseInt(id)
				}
			  }).then((success)=>{
				response.status(200).send('Successfully added rating and comment');
			  })
		})
		// console.log(movie.comments,movie.ratings);
		// response.status(200).send(movie);

})
	
//route to store and retrive rating
router.get('/rating_comment',async(request,response)=>{
	const {id}=request.body;
	await Movie.findOne(
		{
			attributes: ['comments', 'ratings'],
			where:{
				movie_id:id
			}
		}).then(async(success)=>{
				response.status(200).send(success);
	
		})
		// console.log(movie.comments,movie.ratings);
		// response.status(200).send(movie);

})
	

	





// Route to book ticket
router.post('/book_ticket',async(request,response)=>{
	
	


    try{
        const result = await sequalize.transaction(async (t) => {
            const movie_exist = await Movie_Orders.findAll({
                where: {
                    show_id: request.body.show_id,
					seat_no:request.body.seat_no,

                },
                transaction: t
            });
		console.log(!movie_exist.length);
			if(!movie_exist.length){
				const movie_order = await Movie_Orders.build({
                    show_id: request.body.show_id,
					seat_no:request.body.seat_no,
					cust_name:request.body.cust_name,
					transaction: t
				})

				await movie_order.save({
					transaction: t
				}).catch(function(error){
					response.json(error);
					
				});
				// throw new Error();
				response.status(200).json("Success");
			}else{
				throw new Error();
			}
  
        });
        // throw new Error();
    } catch (e) {
        console.log(e);
        response.json({"message": "Transaction Rollbacked"});
    }
})









module.exports = router;
