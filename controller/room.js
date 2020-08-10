const mongoose = require('mongoose');
const Room = require('../models/Room');

module.exports = {
    find: (req, res, next) => {
        Room.find()
            .select('name bookings.startDate bookings.endDate -_id')
            .then(rooms => {
                if(!rooms) return res.status(200).json({msg: 'No bookings yet'});
                return res.status(200).json(rooms)
            })
            .catch(next)
    },

    add: (req, res, next) => {

        let { startDate, endDate } = req.body;

        startDate = new Date(startDate).toUTCString();
        endDate = new Date(endDate).toUTCString();

        const query = {
            bookings: {
                $not: {
                    $elemMatch: {
                        startDate: { $lte: endDate},
                        endDate: { $gte: startDate}
                    }
                }
            }
        };

        const update = {
            $addToSet: {
                bookings: {
                    name: req.user._id,
                    startDate,
                    endDate
                }
            }
        };

        const options = {
            new: true,
            useFindAndModify: false,
            runValidators: true
        };


        Room.findOneAndUpdate(query, update, options)
            .then(result => {
                if(!result) throw new Error('No rooms available');
                return res.status(201).json(result);
            })
            .catch(next);
    },

    edit: (req, res, next) => {
        const { startDate, endDate} = req.body;
        const id = req.user._id;

        
    }

}