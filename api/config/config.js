module.exports = {
    port: process.env.PORT || 4200,
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/pollingdbname'
};
