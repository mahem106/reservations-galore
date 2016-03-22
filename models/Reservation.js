'use strict';

var express = require('express');
var mongoose = require('mongoose');

var reservationSchema = mongoose.Schema({
  time: Date,
  name: String,
  size: Number,
  notes: String,
  arrived: Boolean
});

var Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
