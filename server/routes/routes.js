const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../controller/user");
const Room = require("../controller/room");

const router = express.Router();
//user methods
router.get("/users", authenticateUser, User.getAll);
router.post("/users/signUp", User.signUp);
router.post("/users/signIn", User.signIn);

//Room methods
router.get("/rooms", Room.find);
router.get("/rooms/booking", authenticateUser, Room.findById);
router.post("/rooms", authenticateUser, Room.add);
router.put("/rooms/booking", Room.editById);

function authenticateUser(req, res, next) {
	console.log(req.headers)
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: "No token, check for authorization header" });
	}

	jwt.verify(token, "secret", (err, user) => {
		if (err) {
			return res.status(403).json(err);
		}
		req.user = user;
		next();
	});
}

module.exports = router;
