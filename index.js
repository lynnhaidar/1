//entry point 
const express = require("express");
const app = express(); 
const DB = require("./database").connectDB;

//Routes
const route = require("./routes/route");

//Connect to db
DB();

app.use(express.json());
app.use("/api/auth",route);

app.listen(process.env.PORT,()=>{ 
    console.log(`Listening to port: ${process.env.PORT}`)
});
