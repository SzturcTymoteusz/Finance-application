const express = require('express');
const router = new express.Router();
const User = require('../models/userModel.js');
const {validateEmail} = require('../middleware/validateEmail.js')

router.post('/users', validateEmail, async (req, res) => {
    try {
        if(!req.body.validation) throw new Error('Invalid email');

        const user = await new User(req.body)
        await user.save();

        res.send(user)
    } catch (e) {
        res.send({error : e.message});
    }
})


module.exports = router;