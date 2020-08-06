const express = require('express');
const router = express.Router();

const User = require('../controller/user_controller');
//user methods
router.get('/users', User.findAll);
router.get('/users/dashboard', User.dashBoard);
router.get('/users/:id', User.find);
router.post('/users/register', User.register);
router.post('/users/login', User.login);
router.post('/users/logout', User.logout);


module.exports = router;