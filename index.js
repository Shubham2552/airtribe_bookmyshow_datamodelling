const express = require('express');
const apiRoutes = require('./src/routes/movieRoutes');
const movieRoutes=require('./src/routes/movie_es')
const {sequalize, connectToDB} = require('./src/configs/mysqldb');
const {redisClient, connectToRedis} = require('./src/configs/redis');



const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', apiRoutes);
app.use('/index', movieRoutes);

app.get('/', (request, response) => {
  response.status(200).json({message: 'Hello World!'});
});

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectToDB();
  await connectToRedis();
});