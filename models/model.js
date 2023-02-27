const mongoose = require("mongoose");

const url_schema=new mongoose.Schema({
    shortUrl:{
        type:String,
        required:true
    },
    longUrl:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Url', url_schema);