const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes/routes');

const keys = require('./config/keys').MongoURI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.Promise = global.Promise;

mongoose.connect(keys, options)
	.then(() => console.log('Connected to the database'))
	.catch(err => console.log(err));
	
mongoose.connection.on('error', err => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use('/api', routes);

app.use((err, req, res, next) => {
	res.status(400).json({ error: err.message})
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));