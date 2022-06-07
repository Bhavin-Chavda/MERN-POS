const mongoose = require('mongoose');

const URL = "mongodb+srv://bhavin07:bhavin07@chatappemojify.jacrj.mongodb.net/suplex-pos";

mongoose.connect(URL);

let conObje = mongoose.connection;

conObje.on('connected' , ()=>{
    console.log("Mongo DB connection successfull");
})

conObje.on('error' , ()=>{
    console.log('Connection failed to connect')
})