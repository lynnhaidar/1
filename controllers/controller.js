const validator = require("validator");
const bcrypt = require("bcrypt");

exports.shortURL = async(req,res) =>{
    try{
        let url_l = req.body.longUrl; 
        const localUrl='http://127.0.0.1:3000';

        if(!validator.isLink(url_l)){  
            return res.status(400).json({message: "Invalid URL."});
        }
        let MYURL = await MYURL.findOne({url_l});
        let short = shortid.generate();
        let shortUrl = '${localUrl}/${short}';
        
    }
    catch(err){
    console.log(err);
    res.status(400).json({message: err.message}); 
}
};

exports.longURL = async(req,res) =>{
    try{
        let url_sh = req.body.shorturl; 

        if(!validator.isLink(url_sh)){  
            return res.status(400).json({message: "Invalid URL."});
        }      
        let MYURL = await MYURL.findOne({url_sh});
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message}); 
    }
};

