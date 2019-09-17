const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Aircraft = require('../models/aircraft-models')

router.get('/', (req, res, next) => {
    Aircraft.find().exec().then(docs => {
        console.log("All the records ", docs);
        res.status(200).json(docs);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const aircraft = new Aircraft({
        _id: new mongoose.Types.ObjectId(),
        manufacturer: req.body.manufacturer,
        aircraftFamily: req.body.aircraftFamily,
        aircraftType: req.body.aircraftType,
        category: req.body.category
    });
    aircraft.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling post request from aircraft',
            createdAircraft: result
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:aircraftId', (req, res, next) => {
    const id = req.params.aircraftId;
    Aircraft.findById(id).exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: 'No valid entry provided for the ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:aircraftId', (req, res, next) => {
    const id = req.params.aircraftId;
    const updateOps ={};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
      }
    // second parameter - update list
    Aircraft.update({_id:id}, {$set : updateOps}).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

router.delete('/:aircraftId', (req, res, next) => {
    const id = req.params.aircraftId;
    Aircraft.remove({ _id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router;