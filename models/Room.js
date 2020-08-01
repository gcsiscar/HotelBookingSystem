const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Room_Type_id: {
		type: Schema.Types.ObjectId,
		ref: 'RoomType'
	}

})

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;