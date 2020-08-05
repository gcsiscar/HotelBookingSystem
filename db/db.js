const mongoose = require('mongoose');
const keys = require('../config/keys').MongoURI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise;

mongoose.connect(keys, options)
    .catch(err => console.log(err));

mongoose.connection.once('open', () => {
        console.log('Connected to database');
    })
    .on('error', err => console.log(err));

module.exports = mongoose;