'use strict';

var app = angular.module('reservationApp');

app.controller('reservationCtrl', function($scope, $filter, ReservationService) {

  ReservationService.fetch()
    .then(function(res) {
      console.log(res.data);
      var reservations = res.data;
      $scope.reservations = reservations;
    }, function(err) {
      console.error('err: ', err);
    });

  $scope.addReservation = function() {
    if($scope.newReservation.time == undefined || $scope.newReservation.name == undefined || $scope.newReservation.size == undefined){
      return;
    }
    ReservationService.create($scope.newReservation)
      .then(function(res) {
        var reservations = res.data;
        $scope.reservations.push(reservations);
        $scope.newReservation = {};
      }, function(err) {
        console.error('err: ', err);
      });
  }

  $scope.predicate = 'time';
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
  $scope.editReservation = function(reservation) {
    $scope.reservationToEdit = angular.copy(reservation);
    reservationIndex = $scope.reservations.indexOf(reservation);
  }
  $scope.saveEdit = function() {
    swal({
      title: "Are you sure you want to make these edits?",
      text: `Type: ${$scope.reservationToEdit.type}, Qty: ${$scope.reservationToEdit.qty}, Notes: ${$scope.reservationToEdit.notes}`,
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
          $scope.reservations.splice(reservationIndex, 1, res.data);
          reservationIndex = '';
        })
      swal("Edited successfully!", "", "success");
    })
  }
})
