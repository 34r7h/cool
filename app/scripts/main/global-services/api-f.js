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
				var timeOut = function () {
					State.trip.splice(0, 1);
				};
				for (var x = 0; x < State.trip.length; x++) {
					$timeout(timeOut, (x * 200) + 500);
				}
			},
			killAudio: function () {
				document.getElementById('game-0').currentTime = 0;
				document.getElementById('game-0').pause();
			},
			audio: function (audio) {
				var themeSong = document.getElementById(audio);
				themeSong.play();
				
				$timeout(function () {
					themeSong.currentTime = 0;
					themeSong.pause();
					State.gameStarted ? document.getElementById('game-0').play() : null;
				}, 2000);
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
				
				State.liveTurn = false;
				
				api.audio('walking-0');
				
				$timeout(function () {
					if (State.turn.currentPosition === 57) {
						api.audio('win-0');
						api.killAudio();
						api.message({header: 'Winner!!', text: player.playerName + ' wins the game.'});
						State.gameStarted = false;
					}
					else if (State.players.length < 1) {
						api.message({header: 'Lost!!', text: 'No one wins.'});
						State.gameStarted = false;
						api.killAudio();
					}
					else if (State.players[key + 1]) {
						api.message({text: '', header: 'Next Player ' + State.players[key + 1].playerName});
						State.turn = State.players[key + 1];
						State.liveTurn = true;
						
					} else {
						api.message({text: '', header: 'Next Player ' + State.players[0].playerName});
						State.turn = State.players[0];
						State.liveTurn = true;
					}
					State.trip = [];
					
				}, (State.trip.length * 200) + 500);
				
			},
			movePlayer: function (player) {
				var startingSpace = player.currentPosition;
				State.trip = [Models.spaces[player.currentPosition]];
				State.direction = true;
				
				
				function move(direction) {
					direction ? (player.currentPosition = player.currentPosition + 1) :
						(player.currentPosition = player.currentPosition - 1);
					State.trip.push(Models.spaces[player.currentPosition]);
					return State.trip;
					
				}
				
				for (var x = 0; x < State.currentRoll; x++) {
					
					// Check for pass
					if (
						(startingSpace === 17 && player.currentPosition === 17) ||
						(startingSpace === 32 && player.currentPosition === 32) ||
						(startingSpace === 49 && player.currentPosition === 49)) {
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
							case 49:
								player.currentPosition = 50;
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
							State.show.confirm = true;
						}
						State.splitMove = true;
						State.splitNum = State.currentRoll - x;
						State.splitPlayer = player;
						break;
						
						
					}
					// default movement
					else {
						move(State.direction);
					}
					// Fall back if passing the last pass
					if ((player.currentPosition > 49 && startingSpace !== 49) || player.currentPosition > 57) {
						player.currentPosition = 41;
						State.trip.push(Models.spaces[player.currentPosition]);
					}
				}
			},
			rollDice: function (first, second) {
				// Random roll of two dice,with up to 4 players.
				// One set of sie per corner.
				api.audio('dice-0');
				var total = 0;
				var doubles = false;
				var firstDie = Math.floor(Math.random() * 6) + 1;
				var secondDie = Math.floor(Math.random() * 6) + 1;
				first || second ? State.dice = [first, second] : State.dice = [firstDie, secondDie];
				State.dice[0] === State.dice[1] ? (State.liveTurn = true, doubles = true) : doubles = false;
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
				var playerColors = ['lightBlue', 'lightGreen', 'lightYellow', 'pink'];
				
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
				
			},
			
			splitTurn: function (x, direction, player) {
				var key = State.key;
				var cool = false;
				function move(direction) {
					direction ? (player.currentPosition = player.currentPosition + 1) :
						(player.currentPosition = player.currentPosition - 1);
					State.trip.push(Models.spaces[player.currentPosition]);
					return State.trip;
					
				}
				for(var y = 0; y < x; y++){
					if (
						(player.currentPosition > 10 && player.currentPosition < 24 ) ||
						(player.currentPosition >= 25 && player.currentPosition < 38 )) {
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
				}
				
				Models.spaces[player.currentPosition].color === 'cool?' ?
					(api.card(key), cool = true) :
					Models.spaces[player.currentPosition].color === 'trap' ?
						(
							api.audio('trap-0'),
								api.message({text: '' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'}),
								$timeout(function(){api.goHome(player)},1000)
						) :
						null;
				if (State.playerRoll.doubles === true) {
					api.message({
						text: player.playerName + ' goes again.',
						header: 'Doubles!!'
					});
					State.playerRoll.doubles = false;
					State.liveTurn = true;
				} else {
					api.message({text: '', header: player.playerName + 's turn is over'});
					api.nextPlayer(key);
				}
				
				if (player.currentPosition === 57 || State.trip.length < 1) {
					api.audio('win-0');
					api.killAudio();
					api.message({header: 'Winner!!', text: player.playerName + ' wins the game.'});
					
					State.gameStarted = false;
				}
				
				
				
				if (State.players.length < 1) {
					api.message({header: 'Lost!!', text: 'No one wins.'});
					State.gameStarted = false;
					api.killAudio();
				} else {
					api.nextPlayer(State.players.indexOf(player));
				}
			},
			takeTurn: function (key, player, dice) {
				State.key = key;
				State.splitNum = null;
				State.liveTurn = true;
				// State.messages = [];
				State.trip = [];
				dice ? api.message({header: 'Warning', text: player.playerName + ' is a cheat!'}) : null;
				api.message({header: player.playerName + ' takes a turn.', text: 'Rolling...'});
				var cool = false;
				var playerRoll = dice ? api.rollDice(dice[0], dice[1]) : api.rollDice();
				State.playerRoll = playerRoll;
				if (typeof player.currentPosition !== 'number') {
					playerRoll.doubles ? player.currentPosition = 1 : api.nextPlayer(key);
					return;
				}
				api.movePlayer(player, playerRoll.total);
				if(!State.splitMove){
					Models.spaces[player.currentPosition].color === 'cool?' ?
						(api.card(key), cool = true) :
						Models.spaces[player.currentPosition].color === 'trap' ?
							(
								api.audio('trap-0'),
									api.message({text: '' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'}),
									$timeout(function(){api.goHome(player)},1000)
							) :
							null;
					if (playerRoll.doubles === true) {
						api.message({
							text: player.playerName + ' goes again.',
							header: 'Doubles!!'
						});
						playerRoll.doubles = false;
						State.liveTurn = true;
					} else {
						api.message({text: '', header: player.playerName + 's turn is over'});
						!cool ? api.nextPlayer(key) : null;
					}
					
					if (State.turn.currentPosition === 57 && State.trip.length < 1) {
						api.audio('win-0');
						api.killAudio();
						api.message({header: 'Winner!!', text: player.playerName + ' wins the game.'});
						
						State.gameStarted = false;
					}
					
					if (State.players.length < 1) {
						api.message({header: 'Lost!!', text: 'No one wins.'});
						State.gameStarted = false;
						api.killAudio();
					}
				}
				
			},
			message: function (message) {
				State.messages.push({
					text: message.text,
					header: message.header,
					type: message.type
				});
				$timeout(function () {
					State.messages = [];
				},5000);
			},
			card: function () {
				$timeout(function () {
					var randomCard = Models.cards[Math.floor(Math.random() * Models.cards.length)];
					State.card = randomCard;
				}, (State.trip.length * 200) + 1000);
			},
			goHome: function (player) {
				player.currentPosition = 1;
				api.nextPlayer(State.players.indexOf(player));
			},
			killPlayer: function (player) {
				api.audio('gun-0');
				var playerIndex = State.players.indexOf(player);
				api.nextPlayer(State.players.indexOf(player));
				State.players.splice(playerIndex, 1);
			},
			goStay: function (player) {
				api.audio('cool-0');
				api.nextPlayer(State.players.indexOf(player));
			},
			goPass: function (player) {
				api.audio('yay-0');
				if (player.currentPosition < 24) {
					player.currentPosition = 17;
				}
				else if (player.currentPosition >= 24 && player.currentPosition < 38) {
					player.currentPosition = 32;
				}
				if (player.currentPosition >= 38 && player.currentPosition < 49) {
					player.currentPosition = 49;
				}
				api.nextPlayer(State.players.indexOf(player));
			},
			goJail: function (player) {
				api.audio('siren-0');
				player.currentPosition = 'jail';
				api.nextPlayer(State.players.indexOf(player));
			},
			goSchool: function (player) {
				api.audio('school-0');
				player.currentPosition = 'school';
				api.nextPlayer(State.players.indexOf(player));
			},
			goWork: function (player) {
				api.audio('work-0');
				player.currentPosition = 'work';
				api.nextPlayer(State.players.indexOf(player));
			}
		};
		angular.element($window).bind('resize', function () {
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