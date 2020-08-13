const mongoose = require("mongoose");
const Room = require("../models/Room");

module.exports = {
    find: (req, res, next) => {
        const options = "name bookings.endDate bookings.startDate -_id";

        Room.find()
            .populate("bookings.user_id", "email name -_id")
            .select(options)
            .then((rooms) => {
                if (!rooms)
                    return res.status(200).json({ msg: "No bookings yet" });
                return res.status(200).json(rooms);
            })
            .catch(next);
    },

    add: (req, res, next) => {
        const { startDate, endDate, id } = req.body;

        const bookingId = new mongoose.Types.ObjectId();

        const newStartDate = new Date(`${startDate} 08:00`);
        const newEndDate = new Date(`${endDate} 08:00`);

        const duration = newEndDate.getDate() - newStartDate.getDate();

        const query = {
            bookings: {
                $not: {
                    $elemMatch: {
                        startDate: { $lte: endDate },
                        endDate: { $gte: startDate },
                    },
                },
            },
        };

        const update = {
            $addToSet: {
                bookings: {
                    _id: bookingId,
                    user_id: id,
                    startDate: newStartDate,
                    endDate: newEndDate,
                    duration,
                },
            },
        };

        const options = {
            new: true,
            useFindAndModify: false,
            runValidators: true,
        };

        Room.findOneAndUpdate(query, update, options)
            .populate("bookings.user_id", "email name -_id")
            .then((result) => {
                if (!result)
                    return res
                        .status(400)
                        .json({ error: "No rooms available" });

                const { name, bookings } = result;
                const bookingDetails = bookings.id(bookingId);

                return res
                    .status(201)
                    .json({ name: name, details: bookingDetails });
            })
            .catch(next);
    },
};
