const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomtypeSchema = new Schema({
	typeName: String,
	price: Number
})

const RoomType = mongoose.model('roomtype', roomtypeSchema);

module.exports = RoomType;