const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const app = require("./app");

//Connect to DB
const database = process.env.DATABASE;
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error(err));

//Start the server
const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
