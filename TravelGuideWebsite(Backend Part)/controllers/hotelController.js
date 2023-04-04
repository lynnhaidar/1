const Hotel = require("../models/hotelModel");

//Create a hotel:
exports.createHotel = async(req,res) => {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);

    }catch(err){
        console.log(err);
    }
};

//update a hotel (hotel's name by its ID)
exports.updateHotel = async(req,res) => {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}); //find the hotel by its ID and update it inside the body by the set method
        res.status(200).json(updatedHotel);

    }catch(err){
        console.log(err);
    }
};

//delete a hotel (by its id)
exports.deleteHotel = async(req,res) => {
    try{
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id); 
        res.status(200).json({message: "Hotel has been deleted successfully"});
    }catch(err){
        console.log(err);
    }
};

//get a hotel (by its id)
exports.findHotel = async(req,res) => {
    try{
        const hotel = await Hotel.findById(req.params.id); 
        res.status(200).json(hotel);
    }catch(err){
        console.log(err);
    }
};

//find all the hotels
exports.findAllHotels = async(req,res) => {
    //price between min and max range
    const {min, max,featured, ...others } = req.query;

    try{
        const hotels = await Hotel.find({...others,cheapestPrice: {$gt:min | 1, $lt:max || 999}}).limit(req.query.limit); //greater than min and less than max
        res.status(200).json(hotels);
    }catch(err){
        console.log(err);
    }
};

//For hotel's rating update:
exports.updateRating = async(req,res) =>{
    try{
        let { rating } = req.body;

        if (rating < 1) {
          return res.status(404).json({ message:'rating btw 1 and 5'});
        } else if (rating > 5) {
          return res.status(404).json({ message:'rating btw 1 and 5'});
        }
        const updatedRating = await Hotel.findByIdAndUpdate(req.params.id,{ $set: { rating } },{ new: true });
        res.status(200).json(updatedRating);
    }catch(err){
        console.log(err);
    }
};

//featured hotels(count them by cities) =>returns the number of hotels in the chosen cities
exports.countByCity = async(req,res) => {
    const cities = req.query.cities.split(",");
    try{
        const listOfHotels = await Promise.all(cities.map (city =>{
            return Hotel.countDocuments({city:city}); //returns the number(length)
        }));
        res.status(200).json(listOfHotels);
    }catch(err){
        console.log(err);
    }
};

//Returns the type of hotels(cabin, villa, resort..)
exports.countByType = async(req,res) => {
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const cabinCount = await Hotel.countDocuments({type:"Cabin"});
        const resortCount = await Hotel.countDocuments({type:"Resort"});
        const villaResortCount = await Hotel.countDocuments({type:"VillaResort"});

        res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"cabins", count:cabinCount},
            {type:"resorts", count: resortCount},
            {type:"villaResorts", count:villaResortCount},
        ]);
              
    }catch(err){
        console.log(err);
    }
};