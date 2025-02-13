const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db.js")

const routes = require("./routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
