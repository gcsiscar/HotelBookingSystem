const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	room: {
		type: String,
		ref: "Room",
	},
	startDate: {
		type: Date,
		required: [true, "Please specify a date"],
	},
	endDate: {
		type: Date,
		required: [true, "Please specify a date"],
	},
	duration: Number,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const roomSchema = new Schema({
	name: String,
	bookings: [bookingSchema],
});

module.exports = mongoose.model("Room", roomSchema);
