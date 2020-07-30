const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	Booking_id : {
		$ref: booking,
		$id: ObjectId
	}
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