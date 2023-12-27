const connectDB = require('./db/conn.js');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
const morgan = require('morgan');

//routes 
const userRoute = require('./routes/userRoutes.js');
const todoRoute = require('./routes/todoRoutes.js');
const linkRoute = require('./routes/LinkRoutes.js');
const pomorodoRoute = require('./routes/pomorodoRoutes.js');
const notesRoute = require('./routes/notesRoutes.js');
const chatRoute = require('./routes/chatRoutes.js');
//dotenv config
dotenv.config();

//connection to Database
connectDB();

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));


app.use('/user', userRoute);
app.use('/todo', todoRoute);
app.use('/link', linkRoute);
app.use('/pomorodo', pomorodoRoute);
app.use('/notes', notesRoute);
app.use('/chat', chatRoute);
//ports
const port = process.env.PORT;

app.get('/', function (req, res) {
    res.send('Hello welcome to server');
})

app.listen(port, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} port:${port}`);
})
