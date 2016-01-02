/**
 * @ngdoc service
 * @name cool.Api
 * @description
 * # Api
 * Factory in the cool.
 */
angular.module('cool')
	.factory('Api', function ($state, State, $window) {
		'use strict';

		// INITIALIZATION
		// console.log('Api: Is it cool?');


		// ACTUAL DEFINITION
		var api = {
			rollDice: function () {
				// Random roll of two dice, with up to 4 players.
				// One set of sie per corner.
				var total = 0;
				var doubles = false;
				var firstDie = Math.floor(Math.random() * 6) + 1;
				// console.log('rolling first die...', firstDie);
				var secondDie = Math.floor(Math.random() * 6) + 1;
				// console.log('second die...', secondDie);
				total = firstDie + secondDie;
				// console.log('total roll', total);
				State.currentRoll = total;
				firstDie == secondDie ? (console.log('Doubles!'), doubles = true) : null;
				return {total:total, doubles: doubles};
			},
			/*routePlayer: function (route, type, key) {
				// This handles the player movements between different
				// spaces and cards.
				var params = {};
				params[type] = key;
				var state = 'cool.' + route + '.' + type;
				$state.go(state, params);
				State.players.currentPosition = {state, params}
			},*/
			startGame: function (players) {
				// Chooses players and initiates a new game.
				// console.log('startGame()', players);
				State.players = [];
				var playerRolls = {};
				var rollPlayers = {};
				for (var x = 0; x < players; x++) {
					console.log('startGame() - get names', x);
					var playerName = $window.prompt('What is player ' + (x + 1) + '\'s name?');
					State.players.push({playerName: playerName, currentPosition: 1});
				}
				angular.forEach(State.players, function (player, key) {
					console.info(key, player);
					var startingRoll = api.rollDice().total;
					console.info(rollPlayers[startingRoll]);
					if(rollPlayers[startingRoll]){
						var newRoll = api.rollDice().total;
						while (rollPlayers[newRoll]) {
							console.error('Tied! Rolling Again');
							console.info('player '+player.playerName+' has rolled the same and will now re-roll');
							newRoll = api.rollDice().total;
						}
						rollPlayers[newRoll] = player.playerName;
						playerRolls[player.playerName] = newRoll;

					} else {
						console.info(player.playerName +' has rolled ' + startingRoll);
						rollPlayers[startingRoll] = player.playerName;
						playerRolls[player.playerName] = startingRoll;
					}
				});
				console.log(playerRolls);
				var scores = [];
				var playerOrder = [];
				angular.forEach(playerRolls, function (score, player) {
					console.log(score, player);
					scores.push(score);
				});
				scores.sort(function (a,b) {
					return a-b;
				});
				angular.forEach(scores, function (score) {
					playerOrder.unshift({currentPosition: 1, playerName:rollPlayers[score]});
				});
				console.log('%c',playerOrder, 'color:#00ff00' );
				State.players = playerOrder;
				State.turn = playerOrder[0];
				console.log('%c Game ready to begin. Player '+playerOrder[0].playerName+' goes first.','font-size:2em');
				$state.go('cool.board');
				State.gameStarted = true;

			},
			takeTurn: function (key, player) {
				var playerRoll = api.rollDice();
				player.currentPosition = player.currentPosition + playerRoll.total;
				console.log('player '+player.playerName+' rolled '+playerRoll.total+' '+(playerRoll.doubles ? 'and got doubles!' : '') );
				if (playerRoll.doubles === true) {
					console.log('player '+player.playerName+' goes again.');
				} else {
					if(State.players[key + 1]){
						State.turn = State.players[key + 1];
					} else {
						State.turn = State.players[0];
					}
				}
			}
		};

		/* Rollin to Start
		var playerRoll = this.rollDice();
		 alert('player ' + playerName + ' rolled ' + playerRoll + '!');
		 playerStartRolls[playerRoll] = playerName;
		 if (x == 0) {
		 console.log('first player auto starts');
		 turnOrder = [{[playerName]: playerRoll}];
		 console.log('player 1', turnOrder);
		 } else {
		 if (playerRoll > turnOrder[x-1][Object.keys(turnOrder[x - 1])]) {
		 turnOrder.insert((x - 1), {[playerName]: playerRoll});
		 console.log(turnOrder);
		 } else if(playerRoll == turnOrder[x-1][Object.keys(turnOrder[x - 1])]) {
		 console.log('tied!');
		 }
		 }*/
		return api;
	});