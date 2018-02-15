let env = process.env.NODE_ENV || 'development';
if(env === 'development') {
    process.env.PORT = 4200;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/poll-station';
} else if(env === 'test') {
    process.env.PORT = 4200;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/poll-station_test';
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./../config/config');

const route_polls = require('./routes/api_polls');

var app = express();

/* CORS Access */
app.use(cors());

/* App Configuration */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

/* App Routes */
app.use('/polls', route_polls);

app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}...`);
});

module.exports = { app };