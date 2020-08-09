const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

    dashBoard: (req, res, next) => {
        if (req.session.isOnline) {
            return res.status(200).json({ msg: 'Welcome', user_id: req.session.user_id, session_id: req.sessionID });
        }

        return res.status(401).json({ error: 'Unathorized Access, Log in First' });
    },

    find: (req, res, next) => {
        User.find()
            .select('name email -_id')
            .then(users => {
                if (!users) return res.json({ msg: 'There are no users yet' });
                return res.status(200).json(users);
            })
            .catch(next);
    },

    findById: (req, res, next) => {
        const { id } = req.params

        User.findById(id)
            .select('name email')
            .then(user => {
                if (!user) return res.status(400).json({ error: 'User not found' });
                return res.status(200).json(user);
            })
            .catch(next);
    },

    findByIdAndDelete: (req, res, next) => {
        const { id } = req.params;

        User.findByIdAndDelete(id)
            .then(() => res.status(201).json({ success: 'Successfully Deleted' }))
            .catch(next);
    },

    findByIdAndUpdate: (req, res, next) => {
        const { id } = req.params;
        User.findByIdAndUpdate(id, req.body, { new: true })
            .then(() => res.status(201).json({ success: 'Successfully Updated' }))
            .catch(next);
    },

    login: (req, res, next) => {
        const { email, password } = req.body;

        User.findOne({ email, password })
            .then(user => {
                if (!user) return res.status(400).json({ error: 'Invalid Credentials' });

                req.session.user_id = user._id;
                req.session.isOnline = true;

                return res.status(200).json({ success: 'Log In Successfull' });
            })
            .catch(next);
    },

    logout: (req, res, next) => {
        if (!req.session.isOnline) {
            return res.json({ msg: 'Already Log Out' })
        }

        req.session.destroy(() => {
            return res.status(200).json({ success: 'Log out Successfull' })
        });
    },


    register: (req, res, next) => {
        const { name, email, password, password2 } = req.body;

        if (password !== password2) {
            return res.status(400).json({ error: 'Passwords does not match' });
        }

        User.findOne({ email })
            .then(result => {
                if (result) {
                    return res.status(400).json({ error: 'Email already exists' });
                }

                User.create({
                        _id: new mongoose.Types.ObjectId(),
                        name,
                        email,
                        password
                    })
                    .then(() => res.status(201).json({ success: 'Registered Successfully' }))
                    .catch(next);
            })
            .catch(next);
    },


}