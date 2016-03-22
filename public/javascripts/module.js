'use strict';

var app = angular.module('reservationApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: "views/today.html",
			controller: 'reservationCtrl'
		})
		.state('all', {
			url: '/all',
			templateUrl: "views/all.html",
			controller: 'reservationCtrl'
		})
})
