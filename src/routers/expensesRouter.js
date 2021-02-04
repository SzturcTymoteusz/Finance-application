const express = require('express');
const router = new express.Router();
const Expenses = require('../models/expensesModel.js');
const User = require('../models/userModel.js');

//  Create new expense
router.post('/expenses', async (req, res) => {
    try {
        const expense = await new Expenses({
            ...req.body,
            // owner: req.body._id
        })
        console.log(expense, "work")
        await expense.save();

        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error)
    }
})

// Read all expenses
router.get('/expenses', async (req, res) => {
    try {
        const user = await User.findById('601bf5bad677dd2eb027ff20');
        await user.populate('expenses').execPopulate();

        console.log(user.expenses)

        res.status(200).send();
    } catch (error) {
        // res.status(400).send({message: 'Something go wrong'})
        res.status(400).send(error.message)
    }
})

// Read expenses by id
router.get('/expenses/:id', async (req, res) => {
    try {
        const expense = await Expenses.findById(req.params.id)

        await expense.populate('owner').execPopulate();

        console.log(expense.owner)

        res.status(200).send(expense);
    } catch (error) {
        res.status(400).send({message: "Invalid id"});
    }
})

// Update expense by id
router.patch('/expenses/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['amount', 'description'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation) return res.status(400).send({message: "Invalid updates"});

    try {

        const expense = await Expenses.findById(_id);

        updates.forEach(update => expense[update] = req.body[update])

        await expense.save();

        res.status(200).send(expense);
    } catch (error) {
        res.status(400).send({message: 'Invalid data'});
    }
})

router.delete('/expenses/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        await Expenses.remove({_id});

        res.status(200).send();
    } catch (error) {
        es.status(400).send(error);
    }
})

module.exports = router;