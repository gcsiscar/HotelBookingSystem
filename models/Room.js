const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	placeholder: String
})

const Room = mongoose.model('room', roomSchema);

module.exports = Room;