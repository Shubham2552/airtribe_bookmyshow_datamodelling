const { Client } = require('@elastic/elasticsearch')


const ESClient = new Client({
    cloud: {
      id: 'My_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ3ZDEwODVkYzNhNWM0OGQ0OWRmZjkzNDU3YzA0MWY1MiQzYzdjNjE4MTRkNGM0NjU4Yjg4MjUxNzZmNTEzY2NhOA=='
    },
    auth: {
      username: 'elastic',
      password: 'mysIIP137EP974k0jCAaCZaL'
    }
  })


const connectToES = async () => {
    try {
        const { body } = await ESClient.cluster.health();
        console.log('Elasticsearch Cluster health:', body.status);
    } catch (error) {
        console.error('Error checking cluster health:', error);
    }
};




module.exports = {ESClient, connectToES}