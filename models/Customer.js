const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
	_id: Schema.Types.ObjectId,
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;