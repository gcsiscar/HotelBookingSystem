const mongoose = require('mongoose');

const keys = process.env.MongoURI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise;

mongoose.connect(keys, options)
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log(err));

mongoose.connection.on('error', err => console.log(err));