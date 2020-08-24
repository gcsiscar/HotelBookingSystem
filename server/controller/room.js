const moment = require("moment");
const Room = require("../models/Room");

module.exports = {
    addBooking: async (req, res) => {
        const { startDate, endDate } = req.body;

        const query = {
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
                const { name } = findEmptyRoom;

                const newStartDate = moment.utc(startDate, "YYYY-MM-DD", true);
                const newEndDate = moment.utc(endDate, "YYYY-MM-DD", true);

                const duration = newEndDate.diff(newStartDate, "days");

                const update = {
                    $addToSet: {
                        bookings: {
                            user_id: req.user._id,
                            room: name,
                            startDate: newStartDate,
                            endDate: newEndDate,
                            duration,
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

    getAll: async (req, res) => {
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
        const id = req.user._id;

        try {
            const room = await Room.find({ "bookings.user_id": id })
                .lean()
                .distinct("bookings")
                .exec();

            const formatedRoom = room.map((res) => {
                return Object.assign(res, {
                    startDate: moment.parseZone(res.startDate).format("LL"),
                    endDate: moment.parseZone(res.endDate).format("LL"),
                });
            });

            return res.status(200).json(formatedRoom);
        } catch (err) {
            res.status(400).json(err);
            console.log(err);
        }
    },

    editById: async (req, res) => {
        const { startDate, endDate, id } = req.body;
        const query = {
            "bookings.user_id": id,
        };

        try {
            const room = Room.findOne(query).exec();
            if (room) {
                const newStartDate = moment.utc(startDate, "YYYY-MM-DD", true);
                const newEndDate = moment.utc(endDate, "YYYY-MM-DD", true);

                const duration = newEndDate.diff(newStartDate, "days");
                const update = {
                    $set: {
                        bookings: {
                            startDate: newStartDate,
                            endDate: newEndDate,
                            duration,
                        },
                    },
                };
                try {
                    await room.updateOne(update).exec();
                    return res.status(200).json({ message: "Success" });
                } catch (e) {
                    res.status(400).json(e);
                    console.log(e);
                }
            } else {
                return res.status(400).json({ message: "Error" });
            }
        } catch (e) {
            res.status(400).json(e);
            console.log(e);
        }
    },
};
