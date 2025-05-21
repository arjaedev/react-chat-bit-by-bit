const jwt = require('jsonwebtoken');
const user = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const sessionValidation = async (req, res, next) => {
    console.log("sessionValidation successful");

    try {
        if (req.method === "POST", "GET", "PUT", "DELETE") return next();
        

        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);

        if (!authHeader) throw new Error("Forbidden");

        const authToken = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const payload = jwt.verify(authToken, JWT_SECRET);
        const foundUser = await user.findById(payload.id);

        if (!foundUser) throw new Error("User not found");

        next();
    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({ error: "Unauthorized" });
    }

};
  
module.exports = sessionValidation;
