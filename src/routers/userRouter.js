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
    try {
        console.log('work')

        const user = await User.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        user.save();

        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const user =  await User.remove({_id: req.params.id})

        console.log(user);
        res.status(200).send(user);
        
    } catch (error) {
        res.status(400).send(error);
    }
})


module.exports = router;