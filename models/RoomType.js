const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomtypeSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	typeName: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
})

const RoomType = mongoose.model('roomtype', roomtypeSchema);

module.exports = RoomType;