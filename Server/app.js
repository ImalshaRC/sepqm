const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require('morgan');

const app = express();
app.use(cors());


const expressValidator = require("express-validator");
const { default: mongoose } = require("mongoose");
require('dotenv').config()
// require('./db/connect')


app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

const userRouter = require("./routes/User/User.js");
const authRouter = require("./routes/User/Auth.js");
const movieRouter = require("./routes/movie/Movie.js");
const paymentRouter = require("./routes/payment/Payment.js");

app.get('/',(req, res)=>{
    res.send("Hello from node");
})

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/movie", movieRouter);
app.use("/payment", paymentRouter);

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    }).then(() => console.log("DB Connected"));


const port = process.env.PORT||5000;
app.listen(port,  () => {
    console.log(`Server Listening on port ${port}`)
});

