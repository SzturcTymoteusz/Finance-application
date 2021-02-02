const express = require('express');
const router = new express.Router();
const User = require('../models/userModel.js');
const {validateEmail} = require('../middleware/validateEmail.js')

//  Create new user
router.post('/user', validateEmail, async (req, res) => {
    try {
        if(!req.body.validation) throw new Error('Invalid email');

        const user = await new User(req.body)
        await user.save();

        res.status(201).send(user)
    } catch (e) {
        res.status(400).send({error : e.message});
    }
});

// Login user
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredential(req.body.email);
        
        if(!user) throw new Error("Invalid data")
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }

})

//  Get all user
router.get('/user/getAll', async (req, res) => {
    try {
        const users = await User.find({})


        console.log(users)
        res.status(200).send(users);

    } catch (error) {
        res.status(400).send({message: 'Something go wrong'})
    }
});

// Get user by id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById({_id : req.params.id})

        console.log(user)
        res.status(200).send(user);

    } catch (error) {

        res.status(400).send({message: 'No user'})
    }
});

router.patch('/user/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation) return res.status(400).send({message: "Invalid updates"});

    try {
        const user = await User.findById(_id);

        updates.forEach(update => expense[update] = req.body[update])

        await user.save();

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/user/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        await User.remove({_id})

        res.status(200).send();

    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;