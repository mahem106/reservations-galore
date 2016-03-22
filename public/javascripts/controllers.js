'use strict';

var app = angular.module('reservationApp');

app.controller('reservationCtrl', function($scope, $filter, ReservationService) {

  $scope.today = new Date();

  ReservationService.fetch()
    .then(function(res) {
      var reservations = res.data;
      $scope.reservations = reservations;
      resToday(reservations);
      //setInterval(resToday($scope.reservations), 1800000);
    }, function(err) {
      console.error('err: ', err);
    });

  function resToday(res) {
    var today = [];
    var d1 = $scope.today;
    for (var i = 0; i < res.length; i++) {
      var d2 = new Date(res[i].date);
      var dayDiff = d2.getDate() - d1.getDate();
      var hourDiff = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60);
      if (dayDiff <= 0 && !res[i].arrived && hourDiff <= 1) {
        today.push(res[i])
      }
    }
    $scope.todaysReservations = today;
  }

  $scope.addReservation = function() {
    if ($scope.newReservation.date == undefined || $scope.newReservation.name == undefined || $scope.newReservation.size == undefined) {
      return;
    }
    ReservationService.create($scope.newReservation)
      .then(function(res) {
        var reservation = res.data;
        reservation.arrived = false;
        $scope.reservations.push(reservation);
        $scope.newReservation = {};
      }, function(err) {
        console.error('err: ', err);
      });
  }

  $scope.predicate = 'date';
  $scope.reverse = false;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.removeReservation = function(reservation) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this reservation!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function() {
      ReservationService.remove(reservation)
        .then(function() {
          var index = $scope.reservations.indexOf(reservation);
          $scope.reservations.splice(index, 1);
        }, function(err) {
          console.error('err: ', err);
        })
      swal("Deleted!", "Your reservation has been deleted.", "success");
    });
  };

  $scope.cancel = function() {
    $scope.reservationToEdit = null;
  }
  var reservationIndex;

  $scope.check = function(reservation) {
    ReservationService.update(reservation)
    resToday($scope.reservations)
  }

  $scope.editReservation = function(reservation) {
    $scope.reservationToEdit = angular.copy(reservation);
    reservationIndex = $scope.reservations.indexOf(reservation);
  }
  $scope.saveEdit = function() {
    swal({
      title: "Are you sure you want to make these edits?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6cdd55",
      confirmButtonText: "Yep, I'm sure!",
      closeOnConfirm: false
    }, function() {
      var editReservation = $scope.reservationToEdit;
      $scope.reservationToEdit = null;
      ReservationService.update(editReservation)
        .then(function(res) {
          resToday($scope.reservations)
          // console.log(editReservation);
          // $scope.reservations.splice(reservationIndex, 1, editReservation);
          reservationIndex = '';
        })
      swal("Edited successfully!", "", "success");
    })
  }
})
