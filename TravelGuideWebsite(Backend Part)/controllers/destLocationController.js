const destLocation = require("../models/destLocationModel");

exports.createCountry = async(req,res) => {
    const newCountry = new destLocation(req.body);
    try{
        const savedCountry = await newCountry.save();
        res.status(200).json(savedCountry);
    }catch(err){
        console.log(err);
    }
};

exports.updateDestination = async (req, res) => {
    const destination = await destLocation.findById(req.params.id);
    if (!destination) {
      res.status(404).send("Destination isn't found");
      return;
    }
    destination.country = req.body.country;
    try{
      await destination.save();
      res.json(destination);
    }catch(err) {
        console.log(err);
    }
};
