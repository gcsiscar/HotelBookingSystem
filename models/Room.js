const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId
	},
	Room_Type_id: {
		$ref: roomtype,
		$id: ObjectId
	}

})

const Room = mongoose.model('room', roomSchema);

module.exports = Room;