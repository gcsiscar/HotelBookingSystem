const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
	const authHeader = req.headers.cookie;
	const cookieValue = authHeader
		.split("; ")
		.find((row) => row.startsWith("token"))
		.split("=")[1];
	const token = authHeader && cookieValue;

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
};

module.exports = authenticateUser;
