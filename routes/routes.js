const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../controller/user');
const Room = require('../controller/room');

const router = express.Router();
//user methods
router.get('/users', User.find);
router.get('/users/id', authenticateUser, User.findById);
router.post('/users', User.add);
router.post('/users/login', User.login);
router.delete('/users/id', User.findByIdAndDelete);

//Room methods
router.get('/rooms', Room.find);
router.post('/rooms', authenticateUser, Room.add);

function authenticateUser(req, res, next){
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if(!token) return res.status(401).json({error: 'No token, check for authorization header'});

	jwt.verify(token, 'secret', (err, user) => {
		if(err) return res.status(403).json(err);

		req.user = user;
		next();
	})
}

module.exports = router;