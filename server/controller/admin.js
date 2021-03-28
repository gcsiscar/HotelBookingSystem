const Room = require("../models/Room");
const User = require("../models/userModel");

module.exports = {
  addRoom: async (req, res) => {
    const { name, roomType, rate } = req.body;
    try {
      const room = await Room.findOne({ name }).exec();
      if (room) {
        return res.status(400).json({ message: "Room name must be unique" });
      } else {
        await Room.create({
          name,
          room_type: roomType,
          rate,
        });
        return res.status(201).json({ message: "Room created successfully" });
      }
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  },
  getAllRooms: async (req, res) => {
    try {
      const rooms = await Room.find()
        .lean()
        .populate("bookings.user_id", "email name")
        .exec();

      return res.status(200).json(rooms);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  },
  deleteUser: async (req, res) => {
    const { _id } = req.body;
    const queryRooms = { "bookings.user_id": _id };
    const deleteRooms = { $pull: { bookings: { user_id: _id } } };

    try {
      await Room.updateMany(queryRooms, deleteRooms);
      await User.findByIdAndDelete(_id);
      return res.status(201).json({ message: "Deleted!" });
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await User.find()
        .lean()
        .select("name email createdAt")
        .exec();
      return res.status(200).json(users);
    } catch (err) {
      res.status(400).json(err);
      console.log(err);
    }
  },
};
