const User = require('../models/userModel.js');


const validateEmail = async(req, res, next) => {
    const user = await User.find({email : req.body.email});

    req.body.validation = (user[0]) ? false : true;
    next();
}



module.exports = {
    validateEmail
}