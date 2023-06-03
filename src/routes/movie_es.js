const express = require('express');
const router = express.Router();
const ESClient = require('../configs/elasticsearch').ESClient;
const createBulkMovieShowIndex = require('../scripts/create_bulk_movieshow_index').createBulkMovieShowIndex;
const sequalize = require('../configs/mysqldb').sequalize;

router.get('/movie', async(request, response) => {
	const indexName = parseInt(request.query.index_name) || "movieshow_data";
	try {
		const indexInfo = await ESClient.indices.get({
	  		index: indexName
		});

		console.log(indexInfo);
		response.status(200).json(indexInfo);
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});

router.post('/movie/bulk', async(request, response) => {
	try {
		createBulkMovieShowIndex();
		response.status(200).json({"message": "Index successfully created."});
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});

//route to search for movie based on movie name

router.get('/movie/searchmovie', async(request, response) => {
	try {
		// await ESClient.indices.refresh({ index: 'movieshow_data' })
		const result = await ESClient.search({
			index:  "movieshow_data",
			body: {
				query: {
				  bool: {
					must: [
					  {
						match: {
						  movie_name: request.query.movie_name
						}
					  },
					],
				  }
				}
			  }
			 
		
		  })
		response.status(200).json(result.hits.hits);
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});

//route to search all the movie shows based on language
router.get('/movie/searchlanguage', async(request, response) => {
	try {
		// await ESClient.indices.refresh({ index: 'movieshow_data' })
		const result = await ESClient.search({
			index:  "movieshow_data",
			body: {
				query: {
				  bool: {
					must: [
					  {
						match_all: {
						}
					  },
					],
					filter: [
					  {
						term:{
							"show_language.keyword":request.query.language
						}
					  }

					]
				  }
				}
			  }
			 
		
		  })
		response.status(200).json(result.hits.hits);
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});


router.get('/movie/searchformat', async(request, response) => {
	try {
		await ESClient.indices.refresh({ index: 'movieshow_data' })
		const result = await ESClient.search({
			index:  "movieshow_data",
			body: {
				query: {
				  bool: {
					must: [
					  {
						match_all: {
					
						}
					  },
					],
					filter: [
					  {
						term: {
						  "format.keyword": request.query.format,
						  
						}
					  }

					]
				  }
				}
			  }
			 
		
		  })
		  console.log(result.hits.hits)
		  response.send(result.hits.hits)
		
	} catch (error) {
		console.error('Error getting index:', error);
		response.status(400).json(error);
	}
});

module.exports = router;