const indexName = 'movieshow_data';
const ESClient = require('../configs/elasticsearch').ESClient;
const Movie_Show = require('../models/movies_shows');
const sequalize = require('../configs/mysqldb').sequalize;


const indexMappings = {
	properties: {
        show_id:{type:'interger'},
        theatre_id: { type: 'integer' },
        movie_id:{ type: 'integer' },
        start_time:{ type: 'integer' },
        end_time:{ type: 'integer' },
        day_of_show:{ type: 'integer' },
        show_language:{ type: 'text' },
        format:{ type: 'text' }
	}
};


async function createBulkMovieShowIndex() {
	const movieshowData = await sequalize.query(`SELECT * from Slots s left join Movie_Shows ms on s.slot_id =ms.slot_id`, {type: sequalize.QueryTypes.SELECT})
        console.log(movieshowData);
	try {
    	// await ESClient.indices.create({
      	// 	index: indexName
    	// });

	    // Prepare the bulk indexing requests
	    

	    for (const movie of movieshowData) {

			  await ESClient.index({
    			index: 'movieshow_data',
    			document: {
					show_id:movie.show_id,
					theatre_id: movie.theatre_id,
					movie_id:movie.movie_id,
					start_time:movie.start_time,
					end_time:movie.end_time,
					day_of_show:movie.day_of_show,
					show_language:movie.show_language,
					format:movie.format,
					genre:movie.genre
    				}
  				})
	    }

	// const movieshowData = await sequalize.query(`SELECT * from Movies`, {type: sequalize.QueryTypes.SELECT})
    //     console.log(movieshowData);
	// try {
  
	    

	//     for (const movie of movieshowData) {

	// 		  await ESClient.index({
    // 			index: 'movieshow_data',
    // 			document: {
	// 				movie_id:movie.movie_id,
	// 				movie_name: movie.movie_name,
	// 				cast:movie.movie_id,
	// 				crew:movie.crew,
	// 				movie_plot:movie.movie_plot,
	// 				runtime:movie.runtime,
	// 				language:movie.language,
	// 				genre:movie.genre,
	// 				formats:movie.formats,
	// 				ratings:movie.ratings,
	// 				comments:movie.comments,
    // 				}
  	// 			})
	//     }

   
	 
      	
    } catch (e) {
        console.log(e);
        // throw new Error(e);
    }
}

module.exports = {createBulkMovieShowIndex};
