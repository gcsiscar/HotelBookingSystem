const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	room_name: {
		type: String,
		ref: "Room",
	},
	room_type: {
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
	total: Number,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const roomSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "Room name required"],
	},
	room_type: {
		type: String,
		trim: true,
		enum: ["Single", "Family", "Deluxe"],
		required: [true, "Room type required"],
	},
	rate: {
		type: Number,
		enum: [800, 1400, 2000],
		required: [true, "Must specify a rate"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	bookings: [bookingSchema],
});

module.exports = mongoose.model("Room", roomSchema);
