const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length <= 5){
                throw new Error('Password is too short')
            }
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }

    }
});

userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({email});

    // console.log(user);

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;