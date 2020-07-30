const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
	invoiceDate: {
		type: Date,
		required: true
	}
	total: {
		type: Number,
		required: true
	}
})

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;