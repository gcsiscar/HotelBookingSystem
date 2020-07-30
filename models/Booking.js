const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	Customer_id: {
		$ref: customer,
   		$id: ObjectId
	},
	Room_id: {
		$ref: room,
		$id: ObectId,
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

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;