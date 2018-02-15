const express = require('express');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const router = express.Router();

let { mongoose } = require('./../mongoose');
let { Poll } = require('./../models/poll');
let { Meta } = require('./../models/meta');


/* RETREIVE POLLS */
// ALL
router.get('/', (req, res) => {
    Poll.find().then((polls) => {
        if(!polls) {
            return res.status(404).send();
        }
        return res.status(200).json(polls);
    }).catch((e) => {
        return res.status(500).send();
    })
});
// BY ID
router.get('/:id', (req, res) => {
    if(!req.params.id) {
        return res.status(400).send();
    }
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    Poll.findById(id).then((polls) => {
        if(!polls) {
            return res.status(404).send();
        }
        return res.status(200).json(polls);
    }).catch((e) => {
        return res.status(500).send();
    });
});

/* CREATE POLL */
router.post('/', (req, res) => {
    var body = _.pick(req.body, ['poll_question', 'poll_options']);
    var newPoll = new Poll(body);
    newPoll.save().then(poll => {
        if(!poll) {
            return res.status(404).send();
        }

        let newMeta = new Meta({
            pollId: poll._id
        });
        newMeta.save().then(meta => {
            if(!meta) {
                return res.status(404).send();
            }
            return res.status(200).json(poll);
        }).catch(e => {
            return res.status(500).send();
        });

    }).catch((e) => {
        return res.status(500).send();
    });
});

/* UPDATE POLL */
// BY ID
router.put('/:id', (req, res) => {
    if(!req.params.id) {
        return res.status(400).send();
    }
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    var body = _.pick(req.body, ['poll_question', 'poll_options']);
    Poll.findByIdAndUpdate(id, {$set:body}, {new:true}).then((polls) => {
        if(!polls) {
            return res.status(404).send();
        }
        return res.status(200).json(polls);
    }).catch((e) => {
        return res.status(500).send();
    });
});
// VOTE BY INDEX
router.put('/vote/:id', (req, res) => {
    if(!req.params.id) {
        return res.status(400).send();
    }
    let id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    if(req.body.index == null) {
        return res.status(400).send();
    }
    let index = req.body.index;

    Meta.findOne({pollId: id ,voterIps: req.body.ip}).then(doc => {
        if(doc) {
            return res.status(401).send();
        }

        Poll.findById(id).then((poll) => {
            if(!poll) {
                return res.status(404).send();
            }
            poll.poll_options[index].option_votes++;
            poll.save().then((updatedPoll) => {
                if(!updatedPoll) {
                    return res.status(404).send();
                }
    
                Meta.findOneAndUpdate({pollId: poll._id}, {$push: {voterIps: req.body.ip}}, {new: true}).then(meta => {
                    if(!meta) {
                        return res.status(404).send();
                    }
    
                    return res.status(200).json(updatedPoll);
                }).catch(e => {
                    return res.status(500).send();
                });
    
            }).catch((e) => {
                return res.status(500).send();
            });
        }).catch((e) => {
            return res.status(500).send();
        });

    }).catch((e) => {
        return res.status(500).send();
    });
});

/* DELETE POLL */
// BY ID
router.delete('/:id', (req, res) => {
    if(!req.params.id) {
        return res.status(400).send();
    }
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();   
    }
    Poll.findByIdAndRemove(id).then((poll) => {
        if(!poll) {
            return res.status(404).send();
        }
        return res.status(200).json(poll);
    }).catch((e) => {
        return res.status(500).send();
    });
});

module.exports = router;