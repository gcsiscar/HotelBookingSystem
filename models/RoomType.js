const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomtypeSchema = new Schema({
	_id: Schema.Types.ObjectId,
	typeName: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('RoomType', roomtypeSchema);