const mongoose = require('mongoose');
const config = require('./../config/config');

mongoose.Promise = global.Promise;

mongoose.connect(config.database, {
    useMongoClient: true
}).then(() => {
    
}, (err) => {
    console.log(`Failed to connect to MongoDB: ${e}`);
});

module.exports = { mongoose };

