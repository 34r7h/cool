/**
 * @ngdoc service
 * @name cool.State
 * @description
 * # State
 * Factory in the cool.
 */
angular.module('cool')
	.factory('State', function ($rootScope, $window) {
		'use strict';
		
		// INITIALIZATION
		// console.log('State: Is it cool?');
		$rootScope.points = {};
		$rootScope.screen = {
			width: $window.innerWidth,
			height: $window.innerHeight
		};
		// ACTUAL DEFINITION
		var state = {
			turn: '',
			gameStarted: false,
			// current state of the game
			players: [],
			messages: {},
			dice: [],
			card: {},
			direction: true
		};
		
		return state;
	})
;