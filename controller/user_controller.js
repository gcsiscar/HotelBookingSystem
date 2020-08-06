const mongoose = require('mongoose');
const User = require('../models/User');

const handleRegister = ({ name, email, password, password2 }) => {
    if (!name || !email || !password || !password2) {
        return res.status(400).json({ success: false, msg: 'Empty Field' })
    }

    if (password !== password2) {
        return res.status(400).json({ success: false, msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, msg: 'Password must be at least 6 characters' });
    }
};

module.exports = {
    findAll: async (req, res) => {
        let users = await User.find();

        return res.status(200).json(users);
    },

    dashBoard: async (req, res) => {
        if (!req.session.user_id) {
            return res.status(401).json({ msg: 'Unathorized Access' });
        }

        return res.status(200).json({ msg: 'Welcome', user_id: req.session.user_id, session_id: req.sessionID })
    },

    find: async (req, res) => {
        const { id } = req.params

        let user = await User.findOne({ _id: id });

        if (user) {
            return res.status(200).json(user);
        }

        return res.status(400).json({ msg: 'User not found' })
    },

    register: async (req, res) => {
        const { name, email, password, password2 } = req.body;

        let isRegistered = await User.findOne({ email });

        handleRegister(req.body);

        if (isRegistered) {
            return res.status(400).json({ success: false, msg: 'Email already exists' });
        } else {
            await User.create({
                _id: new mongoose.Types.ObjectId(),
                name,
                email,
                password,
            })

            return res.status(201).json({ success: true, msg: 'Registered Successfull' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        let matchUser = await User.findOne({ email, password });

        if (matchUser) {
            req.session.user_id = matchUser._id;
            req.session.isOnline = true;
            return res.status(200).json({ success: true, msg: 'Log In Successfull' });
        }

        return res.status(400).json({ success: false, msg: 'Email and Password does not match' });

    },

    logout: async (req, res) => {
        if (req.session.isOnline) {
            req.session.destroy(() => {
                return res.status(200).json({ msg: 'Log out Successfull' })
            });
        }

        return res.json({ msg: 'Already Log Out' })
    },

}