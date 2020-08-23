const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "Name field required"],
	},
	email: {
		type: String,
		trim: true,
		required: [true, "Email field required"],
	},
	password: {
		type: String,
		minlength: [6, "Must be atleast 6 characters"],
		required: [true, "Password field required"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);
