'use strict';

var app = angular.module('reservationApp');

app.service('ReservationService', function($http) {

  this.fetch = function() {
    return $http.get('/reservations');
  }

  this.create = function(newReservation) {
    return $http.post('/reservations', newReservation);
  }

  this.remove = function(reservation) {
    return $http.delete(`/reservations/${reservation._id}`);
  }

  this.update = function(reservation) {
    return $http.put(`/reservations/${reservation._id}`, reservation);
  }

});
