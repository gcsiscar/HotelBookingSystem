const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Customer: {
		type: Schema.Types.ObjectId,
		ref: 'Customer',
	},
	Room: {
		type: Schema.Types.ObjectId,
		ref: 'Room',
	},
	checkInDate: {
		type: Date,
		required: true
	},
	checkOutDate: {
		type: Date,
		required: true
	}
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;