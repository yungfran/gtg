const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require("./config/database")
const bodyParser = require('body-parser');

//@TODO
// Storing strength levels, Schema/Model for strength that is tied to a user Schema/Model
// Logic for leveling up progression
// Sessions?


//Load the config file
dotenv.config({ path: "./config/config.env" }); //Path to config file
connectDB(); //Connects us to mongoDB
const app = express(); //App init

 

//Middleware
app.use(bodyParser.json());
app.use(express.json()); //body parser for JSON
app.use(bodyParser.urlencoded({ extended: false })); //parser for URL encoded bodies


app.use(cors());
const apiRoute = require('./routes/api.js');
app.use('/api', apiRoute);

//Static Assets for production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname), 'client', 'build', 'index.html');
    })
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server is running on port ${PORT}`));

//Error handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
