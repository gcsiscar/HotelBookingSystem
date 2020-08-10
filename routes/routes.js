const express = require('express');
const router = express.Router();

const User = require('../controller/user');
const Room = require('../controller/room');


//user methods
router.get('/users', User.find);
router.get('/users/dashboard', User.dashBoard);
router.get('/users/:id', User.findById);
router.post('/users/register', User.register);
router.post('/users/login', User.login);
router.post('/users/logout', User.logout);
router.delete('/users/:id', User.findByIdAndDelete);

//Room methods
router.get('/rooms', Room.find);
router.post('/rooms', Room.add);

module.exports = router;