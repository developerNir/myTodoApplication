
const {readdirSync} = require('fs');

const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


const limiter = rateLimit({
	windowMs: 10* 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})


app.use(express())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(mongoSanitize());
app.use(limiter);



readdirSync('./src/router').map((file) => app.use('/api/v1', require(`./src/router/${file}`)));



// const password = process.env.DATABASE_PASS;
// const username = process.env.DATABASE_USER;

// const url = "mongodb+srv://<username>:<password>@cluster0.opjq5jn.mongodb.net/myToDoApplication";
// const Options = {user: username, pass: password, autoIndex: true}


mongoose
  .connect(process.env.DATA_PATH)
  .then(() => {
    console.log(`database Connection established successful`);
  })
  .catch((error)=>{console.log(error);})



app.use("*", (req, res) => {
  res.status(404).json({
    error: "not found",
    "massage": "UnAuthorized Request"
  });
})




module.exports = app;