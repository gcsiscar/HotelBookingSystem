const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
}).on('error', err => console.log(err))
