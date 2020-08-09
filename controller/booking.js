const mongoose = require('mongoose');
const Booking = require('../models/Booking');

module.exports = {
    getAllBookings: (req, res, next) => {
        Booking.find()
            .populate('user')
            .then(result => {
            	if(!result) return res.json({ msg: 'No bookings yet'});
            	return res.status(200).json(result);
            })
            .catch(next)
    },

    addBookings: (req, res, next) => {
    	const { checkInDate, checkOutDate } = req.body;
        if (!req.session.isOnline) return res.status(400).json({ error: 'Log in first' });
        Booking.create({
                _id: new mongoose.Types.ObjectId(),
                user: req.session.user_id,
                checkInDate,
                checkOutDate
            })
            .then(() =>
                res.status(201).json({ success: 'Booking Successfull' }))
            .catch(next);
    }
}