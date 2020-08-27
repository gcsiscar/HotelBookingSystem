const mongoose = require("mongoose");

const keys = process.env.MongoURI;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

module.exports = {
	init: async () => {
		try {
			await mongoose.connect(keys, options);
			console.log("Connected to the database");
		} catch (err) {
			console.log(err);
		}

		mongoose.connection.on("error", (err) => console.log(err));
	},
};
