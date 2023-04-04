const express = require('express');
const router = express.Router();
const app = express(); 
const DB = require("./database").connectDB;
const path = require("path"); //provides utilities for working with file and directory paths
const cors= require("cors"); //it provides a Connect/Express middleware
const bodyParser = require("body-parser"); //req.body

const destRoutes = require("./routes/destLocationRoutes");
const userRoutes = require("./routes/userRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const placesRoutes = require("./routes/placesRoutes");
const hotelsRoutes = require("./routes/hotelRoutes");

//Connect to our db
DB(); //execute it

app.use(express.json()); //JSON request or response just accepted

//Enable cors 
app.use(cors()); 


app.use("/api/dest", destRoutes); 

app.use("/api/user", userRoutes); //http://localhost:3000/api/user/....

app.use("/api/weather", weatherRoutes);

app.use("/api/places", placesRoutes);

app.use("/api/hotels", hotelsRoutes);


app.listen(process.env.PORT,()=>{ //ANONYMOUS FUNCTION
    console.log(`Listening to port: ${process.env.PORT}`) //${} means paste environment variable
});

module.exports = router;