const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const geocoder = require("../utils/geocoder");

const placesSchema = new mongoose.Schema ({
    placeId: {
        type: String,
        required: [true, "Please add a place ID"],
        unique: true,
        trim: true,
        maxlength: [10, "Place ID has to be less than 10 characters"],

    },

    name: {
        type: String,
        required: true,
    },

    type: { //type of the place whether it's a restaurant or a cafe..
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    location: {
        type: {
            type: String,
            enum: ["Point"], //location.type: must be 'Point'
        },

        coordinates: {
        type: [Number],
        index:"2dspheere"
        },

        formattedAddress: String, //longitude, latitude, zipcode, country, state..
        
        date: { //createdAt
            type: Date,
            default: Date.now()
        }
    },
    
    address: {
        type: String,
        required: true,
    },
    
    distance: {
        type: String,
        required: true
    },
    
    placeDescription: {
        type: String,
        required: true,
    },
    
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },

    images: {
        type: [String], //an array of type string
        required: true,
    },

    cheapestPrice: {
        type: Number,
        required: true,
    },

    phonenumber:{
        type: String,
        minLength: 6,
        required: true,
    },

    featured: {
        type: Boolean,
        default: false,
    }
});

//geocode and create location (mongoose middleware)
placesSchema.pre("save", async function(next){
    const loc = await geocoder.geocode(this.address);//get geocoder location from the address
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }
    //To not save an address
    this.address = undefined;
    next();
});


module.exports = mongoose.model("Places", placesSchema);