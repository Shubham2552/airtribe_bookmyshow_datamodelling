# airtribe-bookmyshow-datamodelling-project

## Before starting project setup
```
goto src/configs/mysqldb.js and enter creadential of database, i suggest create bookymyshow named dedicated database to test this application
```

## Setup and starting project
``` 
first run npm install to install all dependencie 
To run the project run nodemon index.js or node index.js
the app uses sync method, it will automatically create tables if they doesn't exits on start up 
```


## Setting up for usage

### run the given routes
>http://localhost:3000/api/create_theatres - This route will create two theatres named Theatre_A and Theatre_B in table Theatres(theatre_id,theatre_name) <br>
>http://localhost:3000/api/create_movies - This route will create two movies named MovieA and MovieB in table Movies(movie_id,movie_column) <br>
>http://localhost:3000/api/create_time_slots - This route will create two time slots in table Slots(slot_id,start_time,end_time) as (10:00:00,12:00:00) and (15:00:00,17:00:00)


### after running above routes only, run this route

>http://localhost:3000/api/create_show_entries - This will create combinations of all above entries 2 theatres * 2 movies * 2 time_slots * 7 days =56 rows in table Movie_Shows(show_id,theatre_id,movie_id,slot_id,day_of_show)


### get movie shows day and time
>http://localhost:3000/api/movies?movie=MovieA&theatre=Theatre_A - This route search for available shows for MovieA in Theatre_A

