const connectDB = require('./db/conn.js');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');

//dotenv config
dotenv.config();

//connection to Database
connectDB();

app.use(cors());
app.use(express.json());

//ports
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} port:${port}`);
})