const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../controller/user");
const Room = require("../controller/room");

const router = express.Router();
//user methods
router.get("/users", User.getAll);
router.post("/users/signUp", User.signUp);
router.post("/users/signIn", User.signIn);

//Room methods
router.get("/rooms", Room.find);
router.post("/rooms", Room.add);
// router.patch('/rooms/:id', Room.edit);

function authenticateUser(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token)
		return res
			.status(401)
			.json({ error: "No token, check for authorization header" });

	jwt.verify(token, "secret", (err, user) => {
		if (err) return res.status(403).json(err);

		req.user = user;
		next();
	});
}

module.exports = router;
