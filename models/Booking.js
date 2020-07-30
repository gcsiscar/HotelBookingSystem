const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	checkInDate: Date,
	checkOutDate: Date
})

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;