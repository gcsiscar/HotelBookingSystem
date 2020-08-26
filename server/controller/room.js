const Room = require("../models/Room");
const { convertDate, parseDate } = require("../db/handleDate");

const total = (room_type, duration) => {
    switch (room_type) {
        case "Single":
            return 800 * duration;
        case "Family":
            return 1400 * duration;
        case "Deluxe":
            return 2000 * duration;
        default:
            console.log("Error");
            break;
    }
};
module.exports = {
    addBooking: async (req, res) => {
        const { startDate, endDate, roomType } = req.body;

        const query = {
            room_type: roomType,
            bookings: {
                $not: {
                    $elemMatch: {
                        $and: [
                            { startDate: { $lte: endDate } },
                            { endDate: { $gte: startDate } },
                        ],
                    },
                },
            },
        };

        try {
            const findEmptyRoom = await Room.findOne(query).exec();
            if (findEmptyRoom) {
                const { name, room_type } = findEmptyRoom;

                const { newStartDate, newEndDate, duration } = convertDate(
                    startDate,
                    endDate
                );

                const update = {
                    $addToSet: {
                        bookings: {
                            user_id: req.user._id,
                            room_name: name,
                            room_type,
                            startDate: newStartDate,
                            endDate: newEndDate,
                            duration,
                            total: total(room_type, duration),
                        },
                    },
                };

                try {
                    await findEmptyRoom.updateOne(update).exec();
                    return res
                        .status(200)
                        .json({ message: "Booking Successfull" });
                } catch (err) {
                    res.status(400).json(err);
                    console.log(err);
                }
            } else {
                return res.status(400).json({ message: "No rooms available" });
            }
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },
    addRoom: async (req, res) => {
        const { name } = req.body;
        try {
            const room = await Room.findOne({ name }).lean().exec();
            if (room) {
                return res
                    .status(400)
                    .json({ message: "Room name must be unique" });
            } else {
                await Room.create(req.body).exec();
                return res
                    .status(201)
                    .json({ message: "Room created successfully" });
            }
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },

    deleteBooking: async (req, res) => {
        const { _id } = req.body;
        const query = { "bookings._id": _id };
        const deleteEntry = { $pull: { bookings: { _id: _id } } };

        try {
            await Room.updateOne(query, deleteEntry);
            return res.status(201).json({ message: "Deleted!" });
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

    getOne: async (req, res) => {
        const _id = req.user._id;
        const query = { "bookings.user_id": _id };

        try {
            const room = await Room.find(query)
                .lean()
                .distinct("bookings")
                .exec();

            const formatedRoom = room.map((res) => {
                return Object.assign(res, {
                    startDate: parseDate(res.startDate),
                    endDate: parseDate(res.endDate),
                });
            });

            return res.status(200).json(formatedRoom);
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },

    editBooking: async (req, res) => {
        const { startDate, endDate, roomType, _id } = req.body;
        const query = { "bookings._id": _id };
        const deleteEntry = { $pull: { bookings: { _id: _id } } };

        try {
            const findRoom = await Room.findOne(query).exec();
            const { name } = findRoom;

            await findRoom.updateOne(deleteEntry).exec();

            const { newStartDate, newEndDate, duration } = convertDate(
                startDate,
                endDate
            );

            const update = {
                $addToSet: {
                    bookings: {
                        user_id: req.user._id,
                        room_name: name,
                        room_type: roomType,
                        startDate: newStartDate,
                        endDate: newEndDate,
                        duration,
                        total: total(roomType, duration),
                    },
                },
            };

            try {
                await findRoom.updateOne(update).exec();
                return res.status(200).json({ message: "Edit Successfull" });
            } catch (err) {
                res.status(400).json(err);
                console.log(err);
            }
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },
};
