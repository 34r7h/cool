/**
 * @ngdoc service
 * @name cool.Api
 * @description
 * # Api
 * Factory in the cool.
 */
var SVG = SVG;
angular.module('cool')
	.factory('Api', function ($state, State, $window, Models, $timeout, $rootScope) {
		'use strict';
		var api = {
			hide: function () {
				$timeout(function () {
					console.log('removing space from array');
					var time = 0;
					for (var x = 0; x < State.trip.length; x++) {
						$timeout(function () {
							State.trip.splice(0, 1);
						}, (x * 250) + 50);
					}
				}, 1000)
			},
			killAudio: function (all) {
				all ? document.getElementById('game-0').currentPosition = 0 : all = null;
				angular.forEach(Models.audio, function (family, famKey) {
					angular.forEach(family, function (track, key) {
						var htmlTrack = document.getElementById(famKey + '-' + key);
						htmlTrack !== 'game-0' ? (htmlTrack.pause(), htmlTrack.currentPosition = 0) : null;
					});
				});
				document.getElementById('game-0').play();
			},
			audio: function (audio, pause) {
				document.getElementById('game-0').pause();
				var themeSong = document.getElementById(audio);
				themeSong.play();
				$timeout(function () {
					themeSong.volume = 0.7;
				}, 1000);
				$timeout(function () {
					themeSong.volume = 0.4;
				}, 2000);
				$timeout(function () {
					themeSong.volume = 0.1;
				}, 3000);
				pause ? $timeout(function () {
					themeSong.currentTime = 0;
					themeSong.pause();
					document.getElementById('game-0').play();
				}, pause) : null;
			},
			toNumber: function (num) {
				return parseInt(num, 10);
			},
			poly: function (points) {
				var pointsStr = '';
				points ?
					angular.forEach(points.split(' '), function (point) {
						var x = point.split(',')[0],
							y = point.split(',')[1];
						var hPx = Math.floor(($rootScope.screen.width / 100) * x),
							vPx = Math.floor(($rootScope.screen.height / 100) * y);
						pointsStr += hPx + ',' + vPx + ' ';
					}) : null;
				return pointsStr.length > 0 ? pointsStr : null;
			},
			sunglasses: function (x, y) {
				var pointsStr = '';
				var sunglasses = '0,0 20,0 24,4 28,4 32,0 56,0 56,32 36,32 28,16 24,16 20,32 0,32 0,0';
				angular.forEach(sunglasses.split(' '), function (point) {
					var hPx = api.toNumber(point.split(',')[0]) + x,
						vPx = api.toNumber(point.split(',')[1]) + y;
					pointsStr += hPx + ',' + vPx + ' ';

				});
				return pointsStr;

			},
			sunglassesFpv: function (x, y) {
				var pointsStr = '';
				var sunglasses = Models.sunglasses;
				angular.forEach(sunglasses.split(' '), function (point) {
					var hPx = api.toNumber(point.split(',')[0]) * x / 100,
						vPx = api.toNumber(point.split(',')[1]) * y / 100;
					pointsStr += hPx + ',' + vPx + ' ';

				});
				return pointsStr;

			},
			nextPlayer: function (key) {
				api.killAudio();
				api.audio('effects-0', 150);
				State.liveTurn = false;

				$timeout(function () {
					if (State.players[key + 1]) {
						api.message({text: '', header: 'Next Player ' + State.players[key + 1].playerName});
						State.turn = State.players[key + 1];
					} else {
						api.message({text: '', header: 'Next Player ' + State.players[0].playerName});
						State.turn = State.players[0];
					}
					State.liveTurn = true;
				}, (State.trip.length * 500) + 500);

			},
			movePlayer: function (player) {
				var startingSpace = player.currentPosition;
				var currentRoll = State.currentRoll;
				State.trip = [Models.spaces[player.currentPosition]];
				State.direction = true;
				function chooseDirection() {
					api.message({header: player.playerName, text: 'choose direction!'});
					State.direction = $window.confirm(player.playerName + ' rolled ' + State.currentRoll + '. Press OK to move forward. CANCEL to move backwards');
					return State.direction;
				}

				function move(direction) {
					direction ? (console.log('moving forward to', player.currentPosition), player.currentPosition = player.currentPosition + 1) :
						(console.log('moving back from', player.currentPosition), player.currentPosition = player.currentPosition - 1);
					State.trip.push(Models.spaces[player.currentPosition]);
					return State.trip;

				}

				for (var x = 0; x < State.currentRoll; x++) {

					// Check for pass
					if (
						(startingSpace === 17 && player.currentPosition === 17) ||
						(startingSpace === 32 && player.currentPosition === 32) ||
						(startingSpace === 50 && player.currentPosition === 50)) {
						api.message({header: player.playerName, text: 'passing'});
						switch (player.currentPosition) {
							case 17:
								player.currentPosition = 24;
								State.trip.push(Models.spaces[player.currentPosition]);
								break;
							case 32:
								player.currentPosition = 38;
								State.trip.push(Models.spaces[player.currentPosition]);
								break;
							case 50:
								player.currentPosition = 51;
								State.trip.push(Models.spaces[player.currentPosition]);
								break;
						}
					}
					// Check for circles
					else if (
						(player.currentPosition > 10 && player.currentPosition < 24 ) ||
						(player.currentPosition >= 25 && player.currentPosition < 38 )) {
						if (
							(State.currentRoll - x === State.currentRoll) ||
							(player.currentPosition === 11 && startingSpace <= 11) ||
							(player.currentPosition === 25 && startingSpace <= 25)) {
							State.direction = chooseDirection();
						}
						switch (player.currentPosition) {
							case 11:
								!State.direction ? (player.currentPosition = 23, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							case 23:
								State.direction ? (player.currentPosition = 11, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							case 25:
								!State.direction ? (player.currentPosition = 37, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							case 37:
								State.direction ? (player.currentPosition = 25, State.trip.push(Models.spaces[player.currentPosition])) : move(State.direction);
								break;
							default:
								move(State.direction);
						}
					}
					// default movement
					else {
						move(State.direction);
					}
					// Fall back if passing the last pass
					if ((player.currentPosition > 50 && startingSpace !== 50) || player.currentPosition > 58) {
						player.currentPosition = 41;
						State.trip.push(Models.spaces[player.currentPosition]);
					}
				}
				/*var front = SVG('player-glasses');
				 front.front()*/
				// return State.tripLine = State.trip;
			},
			rollDice: function (first, second) {
				// Random roll of two dice,with up to 4 players.
				// One set of sie per corner.
				var total = 0;
				var doubles = false;
				var firstDie = Math.floor(Math.random() * 6) + 1;
				var secondDie = Math.floor(Math.random() * 6) + 1;
				first || second ? State.dice = [first, second] : State.dice = [firstDie, secondDie];
				State.dice[0] === State.dice[1] ? doubles = true : doubles = false;
				total = State.dice[0] + State.dice[1];
				State.currentRoll = total;
				State.turn.playerName ? api.message({header: State.turn.playerName + ' Rolls ', text: State.dice}) : null;
				return {total: total, doubles: doubles};
			},
			startGame: function (players) {
				document.getElementById('game-0').play();
				document.getElementById('game-0').volume = 0.1;
				// Chooses players and initiates a new game.
				State.players = [];
				var playerRolls = {};
				var rollPlayers = {};
				for (var x = 0; x < players; x++) {
					var playerName = $window.prompt('What is player ' + (x + 1) + '\'s name?');
					State.players.push({playerName: playerName, currentPosition: 1});
				}
				angular.forEach(State.players, function (player) {
					var startingRoll = api.rollDice().total;
					if (rollPlayers[startingRoll]) {
						var newRoll = api.rollDice().total;
						while (rollPlayers[newRoll]) {
							newRoll = api.rollDice().total;
						}
						rollPlayers[newRoll] = player.playerName;
						playerRolls[player.playerName] = newRoll;
					} else {
						api.message({header: player.playerName, text: 'rolls ' + startingRoll});
						rollPlayers[startingRoll] = player.playerName;
						playerRolls[player.playerName] = startingRoll;
					}
				});
				var scores = [];
				var playerOrder = [];
				angular.forEach(playerRolls, function (score) {
					scores.push(score);
				});
				scores.sort(function (a, b) {
					return a - b;
				});
				angular.forEach(scores, function (score) {
					playerOrder.unshift({currentPosition: 1, playerName: rollPlayers[score]});
				});
				var playerColors = ['lightPurple', 'lightOrange', 'lightBlue', 'lightGreen', 'lightYellow', 'lightPink', 'pink'];

				angular.forEach(playerOrder, function (player) {
					var randomColor = Math.floor(Math.random() * (playerColors.length - 1));
					player.color = playerColors[randomColor];
					playerColors.splice(randomColor, 1);
				});
				State.players = playerOrder;

				State.turn = playerOrder[0];
				api.message({
					text: playerOrder[0].playerName + ' goes first.',
					header: ''
				});
				$state.go('cool.board');
				State.dice = [0, 0];
				State.gameStarted = true;
				State.liveTurn = true;
				// document.getElementById('game-0').pause();

			},
			takeTurn: function (key, player, dice) {
				// $state.go('cool.board.fpv');

				api.killAudio();
				State.messages = {};
				State.trip = [];
				dice ? api.message({header: 'Warning', text: player.playerName + ' is a cheat!'}) : null;
				api.message({header: player.playerName + ' takes a turn.', text: 'Rolling...'});
				var cool = false;
				var playerRoll = dice ? api.rollDice(dice[0], dice[1]) : api.rollDice();

				if (typeof player.currentPosition !== 'number') {
					playerRoll.doubles ? player.currentPosition = 1 : api.nextPlayer(key);
					return;
				}
				api.movePlayer(player, playerRoll.total);
				Models.spaces[player.currentPosition].color === 'cool?' ?
					(api.card(key), cool = true) :
					Models.spaces[player.currentPosition].color === 'trap' ?
						(
							api.message({text: '' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'}),
								api.goHome(player)
						) :
						null;
				if (playerRoll.doubles === true) {
					api.message({
						text: player.playerName + ' goes again.',
						header: 'Doubles!!'
					});
					playerRoll.doubles = false;
				} else {
					api.message({text: '', header: player.playerName + 's turn is over'});
					!cool ? api.nextPlayer(key) : null;
				}

				if (player.currentPosition === 58 || State.players.length < 1) {
					api.message({header: 'Winner!!', text: player.playerName + ' wins the game.'});
					State.gameStarted = false;
				}

				if (State.players.length < 1) {
					api.message({header: 'Lost!!', text: 'No one wins.'});
					State.gameStarted = false;
				}
				/*$timeout(function () {
				 $state.go('cool.board');
				 }, 3000);*/
			},
			message: function (message) {
				var time = Date.now();
				State.messages[time] = {
					text: message.text,
					header: message.header,
					type: message.type,
					expires: (time + message.duration)
				};
				$timeout(function () {
					State.messages[time] = null;
				},3500)
			},
			card: function () {
				$timeout(function () {
					var randomCard = Models.cards[Math.floor(Math.random() * Models.cards.length)];
					State.card = randomCard;

					(State.card.action === 'goPass') || State.card.action === 'null' ? api.audio('cool-0', 10000) : api.audio('notCool-0', 10000);

					(State.card.action === 'killPlayer') ? api.audio('notCool-1', 10000) : null;
				}, (State.trip.length * 500) + 500);
			},
			goHome: function (player) {
				player.currentPosition = 1;
			},
			killPlayer: function (player) {
				var playerIndex = State.players.indexOf(player);
				api.nextPlayer(State.players.indexOf(player));
				State.players.splice(playerIndex, 1);
			},
			goPass: function (player) {
				if (player.currentPosition < 24) {
					player.currentPosition = 17;
				}
				else if (player.currentPosition >= 24 && player.currentPosition < 38) {
					player.currentPosition = 32;
				}
				if (player.currentPosition >= 38 && player.currentPosition < 50) {
					player.currentPosition = 50;
				}
				api.nextPlayer(State.players.indexOf(player));
			},
			goJail: function (player) {
				player.currentPosition = 'jail';
				api.nextPlayer(State.players.indexOf(player));
			},
			goSchool: function (player) {

				player.currentPosition = 'school';
				api.nextPlayer(State.players.indexOf(player));
			},
			goWork: function (player) {
				player.currentPosition = 'work';
				api.nextPlayer(State.players.indexOf(player));
			}

		};
		angular.element($window).bind('resize', function () {
			console.info('resizing');
			console.info($window.orientation);
			$rootScope.screen = {
				width: $window.innerWidth,
				height: $window.innerHeight
			};
			$rootScope.$apply();
			angular.forEach(Models.sections, function (section) {
				angular.forEach(section, function (space) {
					$rootScope.points[space] = api.poly(Models.spaces[space].poly);
				});
			});
		});
		return api;
	});