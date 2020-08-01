const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Booking: {
		type: Schema.Types.ObjectId,
		ref: 'Booking',
	},
	invoiceDate: {
		type: Date,
		required: true
	},
	total: {
		type: Number,
		required: true
	}
})

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;