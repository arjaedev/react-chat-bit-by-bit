const jwt = require('jsonwebtoken');
const user = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET ? "SET" : "NOT SET");


const sessionValidation = async (req, res, next) => {
    console.log("--------------------sessionValidation Started--------------------");

    try {
        if (req.method === "OPTIONS") next();
        
        const authHeader = req.headers.authorization;
        console.log("AuthHeader:", authHeader ? "SET" : "NOT SET");
        
        if (!authHeader) throw new Error("Forbidden");
        const authToken = authHeader.includes("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

            console.log('authToken:', authToken);
            console.log("authToken:", authToken ? "SET" : "NOT SET");


        const payload = jwt.verify(authToken, JWT_SECRET);
        
        const foundUser = await user.findById(payload.id || payload._id);
        console.log (foundUser)
        
        if (!foundUser) {
            throw new Error("User not found");
        }
        console.log("Found User:", foundUser);

        req.User = {
            _id: foundUser._id, 
            email: foundUser.email, 
            isAdmin: foundUser.isAdmin 
        };

        console.log("User in Request:", req.foundUser);

        next();
        console.log(authHeader);

    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({ error: "Unauthorized" });
    }
    console.log("--------------------sessionValidation Completed--------------------");
    

};
  
module.exports = sessionValidation;


