require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const db = require('./db/db');
// const seed = require('./models/seed');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const routes = require('./routes/routes');

server.use('/api', routes);

server.use((err, req, res, next) => {
    res.status(400).json({ error: err.message })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));