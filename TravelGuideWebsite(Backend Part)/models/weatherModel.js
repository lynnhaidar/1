const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new mongoose.Schema ({
    country: {
        type: String,
        required:true,
    },

    city: {
        type: String,
    },

    code: {
        type: Number,
    },

    date: {
        type: Date,
        default: Date.now()
    },

    headline: {
        type: String, 
    },

    temperature: {
        type: Number,
    },

    icon: {
        type: String,    
    },

    description: {
        type: String,   
    },

});

module.exports = mongoose.model("Weather", weatherSchema);