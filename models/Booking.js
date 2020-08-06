const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	// Room: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Room',
	// },
	checkInDate: {
		type: Date,
		required: true
	},
	checkOutDate: {
		type: Date,
		required: true
	}
})

module.exports = mongoose.model('Booking', bookingSchema);