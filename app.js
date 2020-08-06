require('./db/db')();
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));