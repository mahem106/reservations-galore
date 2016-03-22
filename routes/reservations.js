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

module.exports = router;
