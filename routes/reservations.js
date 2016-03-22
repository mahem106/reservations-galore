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
  var reservation = new Reservation(req.body);
  reservation.save(function(err, savedReservation) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved: ', savedReservation);
    }
    res.send(savedReservation);
  });
})

router.put('/:id', function(req, res) {
  Reservation.findByIdAndUpdate(req.params.id, req.body, function(err, reservation) {
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

router.delete('/:id', function(req, res) {
  Reservation.findByIdAndRemove(req.params.id, function(err, reservation) {
      if (err) {
        res.send('Error: ', err);
      } else {
        res.send('Success');
      }
  });
})

module.exports = router;
