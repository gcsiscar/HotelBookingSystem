const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	// _id: Schema.Types.ObjectId,
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	// Room: {
	// 	type: String,
	// 	ref: 'Room',
	// },
	startDate: {
		type: Date,
		required: [true, 'Please specify a date']
	},
	endDate: {
		type: Date,
		required: [true, 'Please specify a date']
	}
})

const roomSchema = new Schema({
	name: String,
	bookings: [bookingSchema],

});

module.exports = mongoose.model('Room', roomSchema);