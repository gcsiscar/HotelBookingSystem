const mongoose = require('mongoose');
const keys = require('../config/keys').MongoURI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise;

module.exports = async () => {
    try {
        await mongoose.connect(keys, options);
        console.log('Connected to database');
    } catch (e) {
        console.log(e);
    };

    mongoose.connection.on('error', err => console.log(err));
};