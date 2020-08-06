const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	bookings: [bookingSchema],

});

module.exports = mongoose.model('Room', roomSchema);