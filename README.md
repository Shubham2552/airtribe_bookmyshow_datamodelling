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
http://localhost:3000/api/create_movies - This route will create two movies named MovieA and MovieB in table Movies(movie_id,movie_column) <br>
http://localhost:3000/api/create_time_slots - This route will create two time slots in table Slots(slot_id,start_time,end_time) as (10:00:00,12:00:00) and (15:00:00,17:00:00)

There is shows tables that has schema(show_id,theatre_id(foreign key),movie_id(foreign key),slot_id(foreign key),day_of_show)
A orders table to store orders with schema(order_id,cust_name,show_id(foreign key),seat_no)

### after running above routes only, run this route

>http://localhost:3000/api/create_show_entries - This will create combinations of all above entries 2 theatres * 2 movies * 2 time_slots * 7 days =56 rows in table Movie_Shows(show_id,theatre_id,movie_id,slot_id,day_of_show)


### get movie shows day and time
>http://localhost:3000/api/movies?movie=MovieA&theatre=Theatre_A - This route search for available shows for MovieA in Theatre_A

### setting till here remains same
### start the redis server in terminal

>http://localhost:3000/api/book_ticket - Pass the following as body to book ticket body->raw->json {
    "show_id":9,
    "cust_name":"Shubham",
    "seat_no":5
}

### The app hashes the last response, so if same last request is made it will not fetch from database rather if will respond with stored response


