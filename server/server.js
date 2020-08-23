require("dotenv").config();
require("./db/db").init();

const express = require("express");
const cors = require("cors");
// require('./models/seed');
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const routes = require("./routes/routes");

server.use("/api", routes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started at localhost:${PORT}`));