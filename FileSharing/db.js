const mongoose = require('mongoose');
require('dotenv').config();

function connectDB(){
    // mongoDB connection 

    mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});
    const connection = mongoose.connection;

    connection.once('open',()=>{
        console.log("database connected");
    }).catch(err =>{
        console.log(`connection failed ${err}`);
    })
}
module.exports = connectDB;