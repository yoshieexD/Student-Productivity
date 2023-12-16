const connectDB = require('./db/conn.js');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const morgan = require('morgan');

//routes 
const userRoute = require('./routes/userRoutes.js');
//dotenv config
dotenv.config();

//connection to Database
connectDB();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));


app.use('/user', userRoute);
//ports
const port = process.env.PORT;

app.get('/', function (req, res) {
    res.send('Hello welcome to server');
})

app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} port:${port}`);
})
