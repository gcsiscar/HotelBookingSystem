const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String
})

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;