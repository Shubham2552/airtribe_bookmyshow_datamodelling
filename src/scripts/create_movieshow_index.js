const indexName = 'movieshow_data';
const ESClient = require('../configs/elasticsearch').ESClient;

async function createMovieShowIndex() {
try {
	const { body } = await client.indices.create({
		index: indexName,
		body: {
			mappings: {
  				properties: {
  				
                    theatre_id: { type: 'integer' },
                    movie_id:{ type: 'integer' },
                    start_time:{ type: 'integer' },
                    end_time:{ type: 'integer' },
                    day_of_show:{ type: 'integer' },
                    show_language:{ type: 'text' },
                    format:{ type: 'text' }
  				}
			}
		}
	});
    console.log('Index created:', body);
  	} catch (error) {
    	console.error('Error creating index:', error);
  	}
}

module.exports = {createMovieShowIndex};