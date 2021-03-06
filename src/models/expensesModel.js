const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    kind: {
        type: String,
        require: true,
        trim: true
    },
    amount: {
        type: Number,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
});

const Expenses = new mongoose.model('Expenses', expensesSchema);

module.exports = Expenses;