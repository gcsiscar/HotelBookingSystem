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

const RoomType = mongoose.model('RoomType', roomtypeSchema);

module.exports = RoomType;