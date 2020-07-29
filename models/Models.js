const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
	checkInDate: Date,
	checkOutDate: Date
})

const customerSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String
})

const invoiceSchema = new Schema({
	invoiceDate: Date,
	total: Number
})

const roomSchema = new Schema({
	placeholder: String
})

const roomTypeSchema = new Schema({
	typeName: String,
	roomPrice: Number
})


const Booking = mongoose.model('booking', bookingSchema);
const Customer = mongoose.model('customer', customerSchema);
const Invoice = mongoose.model('invoice', invoiceSchema);
const Room = mongoose.model('room', roomSchema);
const RoomType = mongoose.model('roomtype', roomTypeSchema);


module.exports = {Booking, Customer, Invoice, Room, RoomType}