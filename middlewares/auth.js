const User = require("../model/User");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        console.log('Token:', token);

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Login to access this resource"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:", decoded)
        const user = await User.findById(decoded._id);
        req.user = user;

        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = isAuthenticated;