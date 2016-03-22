'use strict';

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Reservation = require('../models/Reservation.js');

router.get('/', function(req, res, next) {
  Reservation.find({}, function(err, reservations) {
    console.log('err: ', err);
    console.log('reservations: ', reservations);
  res.send(reservations);
  })
});

router.post('/', function(req, res, next) {
  var reservation = new Reservation (req.body);
  reservation.save(function(err, savedReservation) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved: ', savedReservation);
    }
    res.send(savedReservation);
  });
})

router.put('/:id', function functionName(req, res) {
  Reservation.findById(req.params.id, function(err, reservation) {

    reservation.time = req.body.time;
    reservation.name = req.body.name;
    reservation.size = req.body.size;
    reservation.notes = req.body.notes;
    reservation.arrived = req.body.arrived;

    reservation.save(function(err, savedReservation) {
      if (err) {
        console.log(err);
      } else {
        console.log('saved: ', savedReservation);
      }
      res.send(savedReservation);
    })
  })
})

module.exports = router;
