const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

//Get All Users
router.get('/', async (req, res) => {
    try {
        let users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//Get a User
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let user = await User.findOne({ _id: id });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json(error)
    }
})

//Register a User
router.post('/', async (req, res) => {
    const { name, email, password, password2 } = req.body;

    let isRegistered = await User.findOne({ email });

    if (!name || !email || !password || !password2) {
        return res.status(400).json({ success: false, msg: 'Empty Field' })
    }

    if (password !== password2) {
        return res.status(400).json({ success: false, msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters' });
    }

    if (isRegistered) {
        return res.status(400).json({ success: false, msg: 'Email already exists' });
    } else {
        let newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password,
        })

        await newUser.save();
        return res.status(201).json({ success: true, msg: 'Registered Successfull' });
    }

});

//Login a User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let matchUser = await User.findOne({ email, password });
        if (matchUser) {
            return res.status(200).json({ success: true, msg: 'Log In Successfull' });
        } else {
            return res.status(400).json({ success: false, msg: 'Email and Password does not match' });
        }
    } catch (error) {
        return res.status(400).json(error)
    }

})

module.exports = router;