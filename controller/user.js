const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = {
    add: (req, res, next) => {
        const { name, email, password, password2 } = req.body;

        if (password !== password2) {
            return res.status(400).json({ error: 'Passwords does not match' });
        }

        User.findOne({ email })
            .then(result => {
                if (result) return res.status(400).json({ error: 'Email already exists' });

                User.create({
                        name,
                        email,
                        password
                    })
                    .then(() => res.status(201).json({ msg: 'Registered Successfully' }))
                    .catch(next);
            })
            .catch(next);
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
        const id = req.user._id;

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
            .then(() => res.status(201).json({ msg: 'Successfully Deleted' }))
            .catch(next);
    },

    findByIdAndUpdate: (req, res, next) => {
        const { id } = req.params;
        User.findByIdAndUpdate(id, req.body, { new: true })
            .then(() => res.status(201).json({ msg: 'Successfully Updated' }))
            .catch(next);
    },

    login: (req, res, next) => {
        const { email, password } = req.body;

        User.findOne({ email, password })
            .then(result => {
                if (!result) return res.status(400).json({ error: 'Invalid Credentials' });

                const user = {
                    _id: result._id
                };

                const token = jwt.sign(user, 'secret');

                return res.status(200).json({ msg: 'Log In Successfully', token });
            })
            .catch(next);
    },



}