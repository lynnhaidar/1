const Places = require("../models/placesModel");

//create a place 
exports.createPlace = async(req,res) => {
    const newPlace = new Places(req.body);
    try{
        const savedPlace = await newPlace.save();
        res.status(200).json(savedPlace);

    }catch(err){
        console.log(err);
    }
};

//update a place by its ID
exports.updatePlace = async(req,res) => {
    try{
        const updatedPlace = await Places.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}); 
        res.status(200).json(updatedPlace);
    }catch(err){
        console.log(err);
    }
};

//delete a place (by its id)
exports.deletePlace = async(req,res) => {
    try{
        const deletedPlace = await Places.findByIdAndDelete(req.params.id); 
        res.status(200).json({message: "Place has been deleted successfully"});
    }catch(err){
        console.log(err);
    }
};

//get a placehotel (by its id)
exports.findPlace = async(req,res) => {
    try{
        const place = await Places.findById(req.params.id); 
        res.status(200).json(place);
    }catch(err){
        console.log(err);
    }
};

//find all the places
exports.findAllPlaces = async(req,res) => {
    //price between min and max range
    const {min, max, ...others } = req.query;

    try{
        const places = await Places.find({...others,cheapestPrice: {$gt:min | 1, $lt:max || 999}}).limit(req.query.limit); //greater than min and less than max
        res.status(200).json(places);
    }catch(err){
        console.log(err);
    }
};

//For place's rating update:
exports.updateRating = async(req,res) =>{
    try{
        let { rating } = req.body;
        if (rating < 1) {
            rating = 1;
        }else if (rating > 5) {
            rating = 5;
        }
        const updatedRating = await Places.findByIdAndUpdate(req.params.id, {rating}, {new: true}); 
        res.status(200).json(updatedRating);
    }catch(err){
        console.log(err);
    }
};

//count the places in the selected city
exports.countByCity = async(req,res) => {
    const cities = req.query.cities.split(",");
    try{
        const listofPlaces = await Promise.all(cities.map (city => {
            return Places.countDocuments({city:city});
        } ));
        res.status(200).json(listofPlaces);
    }catch(err){
        console.log(err);
    }
};

//Returns the type of places
exports.countByType = async(req,res) => {
    try{
        const restaurantCount = await Places.countDocuments({type:"Restaurant"});
        const cafeCount = await Places.countDocuments({type:"Cafe"});
        const pubCount = await Places.countDocuments({type:"Pub"});

        res.status(200).json([
            {type:"restaurants", count:restaurantCount},
            {type:"cafes", count:cafeCount},
            {type:"pubs", count: pubCount},
        ]);

    }catch(err){
        console.log(err);
    }
};