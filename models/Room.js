const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	_id: Schema.Types.ObjectId,
	Room_Type: {
		type: Schema.Types.ObjectId,
		ref: 'RoomType'
	}

})

module.exports = mongoose.model('Room', roomSchema);