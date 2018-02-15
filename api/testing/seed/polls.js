const { ObjectID } = require('mongodb');
var { Poll } = require('./../../server/models/poll');

const polls = [{
    _id: new ObjectID('5a1c6e8e0a125609e805d6a1'),
    poll_question: 'Red or Green?',
    poll_options: [
        {
            option_name: 'Red',
            option_votes: Math.round((Math.random() * 100) / 10)
        },
        {
            option_name: 'Green',
            option_votes: Math.round((Math.random() * 100) / 10)
        }
    ]
},
{
    _id: new ObjectID('5a1c6e8e0a125609e805d6a6'),
    poll_question: 'Yellow or Red?',
    poll_options: [
        {
            option_name: 'Yellow',
            option_votes: Math.round((Math.random() * 100) / 10)
        },
        {
            option_name: 'Red',
            option_votes: Math.round((Math.random() * 100) / 10)
        }
    ]
}];

const populatePolls = (done => {
    Poll.remove().then(() => {
        return Poll.insertMany(polls);
    }).then(() => {
        done();
    });
});

module.exports = { polls, populatePolls };