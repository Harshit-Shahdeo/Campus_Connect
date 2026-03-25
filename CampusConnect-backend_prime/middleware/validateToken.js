const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Corrected split logic
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded; // Contains user_id, user_email, and user_name
            next();
        } catch (err) {
            res.status(401);
            throw new Error("User not authorized or invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Token is missing or header is malformed");
    }
});

module.exports = validateToken;