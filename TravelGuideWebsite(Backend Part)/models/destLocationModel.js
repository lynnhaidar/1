const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destLocationSchema = new Schema ({    
    country: {
        type: String,
        required: true
    },

    weatherInCountry: {
        type: Schema.Types.ObjectId,
        ref: "Weather",
    },

    placesInCountry: {
        type: Schema.Types.ObjectId,
        ref: "Places",
    },

    hotelsInCountry: {
        type: Schema.Types.ObjectId,
        ref: "Hotels",
    },

});

module.exports = mongoose.model("DestinationLocation", destLocationSchema);