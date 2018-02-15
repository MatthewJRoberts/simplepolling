// Test REST Api
const request = require('supertest');
const expect = require('expect');
const { ObjectID } = require('mongodb');

const { app } = require('./../server/server');
const { Poll } = require('./../server/models/poll');
const { polls, populatePolls } = require('./seed/polls');

beforeEach(populatePolls);

describe('API Testing...', () => {

// RETREIVE ALL POLLS
    
    describe('GET /polls', () => {
        it('should get all polls', done => {
            request(app)
                .get('/polls')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toBeTruthy()
                    expect(res.body.length).toEqual(2)
                })
                .end(done);
        });
    });

// RETREIVE POLL BY ID

    describe('GET /polls/:id', () => {
        it('should get single poll', done => {
            request(app)
                .get('/polls/5a1c6e8e0a125609e805d6a6')
                .expect(200)
                .expect((res) => {
                    expect(res.body.poll_question).toBeTruthy()
                })
                .end(done);
        });
    });

// POST POLL

    describe('POST /polls', () => {
        it('should create a new poll', done => {
            request(app)
                .post('/polls')
                .send({
                    poll_question: 'Wrong or Right?',
                    poll_options: [
                        {
                            option_name: 'Wrong',
                            option_votes: 44
                        },
                        {
                            option_name: 'Right',
                            option_votes: 13
                        }
                    ]
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body).toBeTruthy()
                    expect(res.body).toMatchObject({ poll_question: 'Wrong or Right?' })
                })
                .end(done);
        });
    });

// DELETE POLL

    describe('DELETE /polls/:id', () => {
        it('should delete a poll', done => {
            request(app)
                .delete('/polls/5a1c6e8e0a125609e805d6a1')
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe('5a1c6e8e0a125609e805d6a1')
                })
                .end(done);
        });
    });

// UPDATE POLL

    describe('PUT /polls/:id', () => {
        it('should update a poll', done => {
            request(app)
                .put('/polls/5a1c6e8e0a125609e805d6a1')
                .send({
                    poll_question: 'Black or Green?',
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
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.poll_question).toBe('Black or Green?')
                })
                .end(done)
        });
    });

});
