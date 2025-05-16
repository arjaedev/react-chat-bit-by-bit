const jwt = require('jsonwebtoken');
const user = require('../models/User');




const JWT_SECRET = process.env.JWT_SECRET;


const sessionValidation = async (req, res, next) => {
    try{

        console.log("sessionValidation");
        if (req.method === "OPTIONS") next();

        if (!req.headers.authorization) throw new Error("Forbidden");

        const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization;


        const payload= jwt.verify(authToken, JWT_SECRET)

        const foundUser = await user.findById(payload.id);

        if (!foundUser) throw new Error("User not found");

        req.user = { _id: foundUser._id, fullName: foundUser.fullName}
        next();
        console.log(req.headers.authorization);
    
    }

    catch(err){
        console.log(err);
        res.status(500).json({
            error: `${err}`
        })
    }
    console.log("sessionValidation");
}

module.exports = sessionValidation