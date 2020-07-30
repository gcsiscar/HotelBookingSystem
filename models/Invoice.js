const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
	invoiceDate: Date,
	total: Number
})

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;