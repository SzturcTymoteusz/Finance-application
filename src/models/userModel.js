const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Expenses = require('../models/expensesModel.js');
const jwt = require('jsonwebtoken');


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

    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

userSchema.virtual('expenses', {
    ref: 'Expenses',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({email});

    if(!user) throw new Error('Unable to login');

    console.log(user.password)
    console.log(password)

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) throw new Error('Unable to login');

    return user;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'To jest ściśle tajny kod');

    user.tokens = user.tokens.concat({ token });
    await user.save()

    return token
}


userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;