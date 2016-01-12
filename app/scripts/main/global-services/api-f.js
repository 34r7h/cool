/**
 * @ngdoc service
 * @name cool.Api
 * @description
 * # Api
 * Factory in the cool.
 */
angular.module('cool')
	.factory('Api', function ($state, State, $window, Models) {
		'use strict';

		// INITIALIZATION
		// console.log('Api: Is it cool?');


		// ACTUAL DEFINITION
		var api = {
			nextPlayer: function (key) {
				if (State.players[key + 1]) {
					api.message({text: 'moving on', header: 'Next Player ' + State.players[key + 1].playerName});
					State.turn = State.players[key + 1];
				} else {
					api.message({text: 'moving on', header: 'Next Player ' + State.players[0].playerName});
					State.turn = State.players[0];
				}
			},
			movePlayer: function (player) {
				var startingSpace = player.currentPosition;
				var currentRoll = State.currentRoll;
				function pass() {
					if (player.currentPosition === 17 || player.currentPosition === 32 || player.currentPosition === 50) {
						console.log('the pass is real');
						switch (player.currentPosition) {
							case 17:
								console.log('17!');
								break;
							case 32:
								console.log('32!');
								break;
							case 50:
								console.log('50!');
								break;
						}
						var passable = true;
						api.message({header: player.playerName, text: 'can pass!'})
					} else {
						console.log('no can pass');
					}
					return passable;
				}
				function chooseDirection() {
					console.log('choosing direction');
					State.direction = $window.confirm(player.playerName + ' rolled ' + State.currentRoll + '. Press OK to move forward. CANCEL to move backwards');
				}
				function move(direction) {
					console.warn('moving', direction);
					direction ? player.currentPosition = player.currentPosition + 1 :
						player.currentPosition = player.currentPosition - 1;
				}
				api.message({header: player.playerName + ' is on ' + startingSpace, text: 'Rolled a ' + currentRoll});
				/*if(player.currentPosition !== 49 || (player.currentPosition > 10 && player.currentPosition < 24 && player.currentPosition !== 17) || (player.currentPosition > 24 && player.currentPosition < 38 && player.currentPosition !== 32)){
					State.direction = chooseState.direction();
				}*/

				for (var x = 0; x < State.currentRoll; x++) {
					// Check State.direction

					// Check for pass
					if(startingSpace === 17 && player.currentPosition === 17){
						console.warn('startingSpace === 17');
						player.currentPosition = 24;}
					else if (startingSpace === 32 && player.currentPosition === 32){
						console.warn('startingSpace === 32');
						player.currentPosition = 38;}
					else if (startingSpace === 50 && player.currentPosition === 50){
						console.warn('startingSpace === 50');
						player.currentPosition = 51;}

					// Check for circles
					// 11-23
					else if (player.currentPosition === 11 && startingSpace <= 11){
						console.warn('player.currentPosition === 11 && startingSpace <= 11');
						State.direction = chooseDirection();
						!State.direction ? (player.currentPosition = 23) : move(State.direction);
					}
					else if (player.currentPosition === 11 && startingSpace > 11){
						console.warn('player.currentPosition === 11 && startingSpace > 11');
						!State.direction ? (player.currentPosition = 23) : move(State.direction);
					}
					else if (player.currentPosition === 23){
						console.warn('player.currentPosition === 23');
						State.direction ? (player.currentPosition = 11) : move(State.direction);
					}
					// 25-37
					else if (player.currentPosition === 25 && startingSpace <= 25) {
						console.warn('player.currentPosition === 25 && startingSpace <= 25');
						State.direction = chooseDirection();
						!State.direction ? (player.currentPosition = 37) : move(State.direction);
					}
					else if (player.currentPosition === 25 && startingSpace > 25) {
						console.warn('player.currentPosition === 25 && startingSpace > 25');
						!State.direction ? (player.currentPosition = 37) : move(State.direction);
					}
					else if (player.currentPosition === 37) {
						console.warn('player.currentPosition === 37');
						State.direction ? (player.currentPosition = 25) : move(State.direction);
					}

					// Check for gaps
					// 24
					else if (player.currentPosition === 24){
						console.warn('player.currentPosition === 24');
						State.direction = true;
						move(State.direction);
					}
					// 38-40
					else if (player.currentPosition >= 38 && player.currentPosition < 41){
						console.warn('player.currentPosition >= 38 && player.currentPosition < 41');
						State.direction = true;
						move(State.direction);
					}

					// Check for sunglasses space
					else if (player.currentPosition > 50 && startingSpace !== 50){
						player.currentPosition = 49;
						break;
					}
					else if (startingSpace === 49 && player.currentPosition === 49){
						var sunglasses = $window.confirm('Confirm to move forward or cancel back to the top of the "L"?');
						State.direction = true;
						sunglasses ? move(State.direction) : player.currentPosition = 41;
					}
					// default movement
					else {
						console.warn('default movement');
						move(State.direction);
					}

				}
			},
			rollDice: function (first, second) {
				first || second ? console.log('%s cheats', 'background:red;color:white;'):null;
				// Random roll of two dice, with up to 4 players.
				// One set of sie per corner.
				var total = 0;
				var doubles = false;
				var firstDie = Math.floor(Math.random() * 6) + 1;
				State.dice[0] = first || firstDie;
				// console.log('rolling first die...', firstDie);
				var secondDie = Math.floor(Math.random() * 6) + 1;
				State.dice[1] = second || secondDie;
				firstDie === secondDie ? doubles = true : null;
				(first === second) && (typeof first==='number') ? doubles = true : null;
				// console.log('second die...', secondDie);
				total = (first + second || firstDie + secondDie);
				// console.log('total roll', total);
				State.currentRoll = total;
				api.message({header: State.turn.playerName + ' Rolls ', text: State.dice});
				return {total: total, doubles: doubles};
			},
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
					if (rollPlayers[startingRoll]) {
						var newRoll = api.rollDice().total;
						while (rollPlayers[newRoll]) {
							console.error('Tied! Rolling Again');
							console.info('player ' + player.playerName + ' has rolled the same and will now re-roll');
							newRoll = api.rollDice().total;
						}
						rollPlayers[newRoll] = player.playerName;
						playerRolls[player.playerName] = newRoll;

					} else {
						console.info(player.playerName + ' has rolled ' + startingRoll);
						rollPlayers[startingRoll] = player.playerName;
						playerRolls[player.playerName] = startingRoll;
					}
				});
				console.log(playerRolls);
				var scores = [];
				var playerOrder = [];
				angular.forEach(playerRolls, function (score, player) {
					scores.push(score);
				});
				scores.sort(function (a, b) {
					return a - b;
				});
				angular.forEach(scores, function (score) {
					playerOrder.unshift({currentPosition: 1, playerName: rollPlayers[score]});
				});
				console.log('%c', playerOrder, 'color:#00ff00');
				var playerColors = ['lightPurple', 'lightOrange', 'lightBlue', 'lightGreen', 'lightYellow', 'lightPink', 'pink'];

				angular.forEach(playerOrder, function (player) {
					var randomColor = Math.floor(Math.random() * (playerColors.length - 1));
					player.color = playerColors[randomColor];
					playerColors.splice(randomColor, 1);
				});
				State.players = playerOrder;

				State.turn = playerOrder[0];
				console.log('%c Game ready to begin. Player ' + playerOrder[0].playerName + ' goes first.', 'font-size:2em');
				api.message({
					text: playerOrder[0].playerName + ' goes first.',
					header: 'Game ready to begin.'
				});
				$state.go('cool.board');
				State.gameStarted = true;

			},
			takeTurn: function (key, player, dice) {
				State.messages = {};
				dice ? api.message({header:'Warning', text: player.playerName + ' is a cheat!'}):null;
				api.message({header: player.playerName + ' takes a turn.', text: 'Rolling...'});
				var cool = false;
				var playerRoll = dice ? api.rollDice(dice[0],dice[1]): api.rollDice();
				if (typeof player.currentPosition !== 'number') {
					console.log('not a number');
					playerRoll.doubles ? player.currentPosition = 1 : api.nextPlayer(key);
					return;
				}
				api.movePlayer(player, playerRoll.total);
				Models.spaces[player.currentPosition] === 'cool?' ?
					(api.card(key), cool = true) :
					Models.spaces[player.currentPosition] === 'trap' ?
						(
							console.log('Its a trap!!'),
								api.message({text: 'Oh no, ' + player.playerName + ' sent back to start!', header: 'It\'s a trap!!'}),
								api.goHome(player)
						) :
						null;
				if (playerRoll.doubles === true) {
					console.log('player ' + player.playerName + ' goes again.');
					api.message({
						text: player.playerName + ' goes again.',
						header: 'Doubles!!'
					});
				} else {
					api.message({text: 'next player is up.', header: player.playerName + 's turn is over'});
					!cool ? api.nextPlayer(key) : null;
				}

				if(player.currentPosition === 58) {
					api.message({header:'Winner!!', text: player.playerName + ' wins the game.'});
					State.gameStarted = false;
				}
			},
			message: function (message) {
				console.info(message.header, message.text);
				var time = Date.now();
				State.messages[time] = {
					text: message.text,
					header: message.header,
					type: message.type,
					expires: (time + message.duration)
				}
			},
			card: function () {
				api.message({header: 'Getting card', text: 'Is it cool?'});
				var randomCard = Models.cards[Math.floor(Math.random() * Models.cards.length)];
				State.card = randomCard;
			},
			goHome: function (player) {
				api.message({header: 'Going home', text: player.playerName + 'Is it cool?'});
				player.currentPosition = 1;
			},
			killPlayer: function (player) {
				var playerIndex = State.players.indexOf(player);
				api.message({
					text: 'Rough, son. Better luck on the next one',
					header: State.players[playerIndex].playerName + 'is dead.'
				});
				api.nextPlayer(State.players.indexOf(player));
				State.players.splice(playerIndex, 1);
				// State.turn = playerIndex>0?State.players[playerIndex+1]:State.players[0];
			},
			goPass: function (player) {
				console.log('getting a pass, ya baby!!');
				api.message({text: 'Getting a pass, finishing fast!!', header: player.playerName + ' is lucky.'});
				if(player.currentPosition < 24){player.currentPosition = 17}
				else if(player.currentPosition >= 24 && player.currentPosition < 38){player.currentPosition = 32}
				if(player.currentPosition >= 38 && player.currentPosition < 50){player.currentPosition = 50}
				api.nextPlayer(State.players.indexOf(player));
			},
			goJail: function (player) {
				api.message({
					text: 'Getting sent to jail sucks, too bad now you\'re stuck!!',
					header: player.playerName + ' is locked-up.'
				});
				player.currentPosition = 'jail';
				api.nextPlayer(State.players.indexOf(player));
			},
			goSchool: function (player) {
				api.message({text: 'Smarten up, level up', header: player.playerName + ' is getting schooled.'});
				player.currentPosition = 'school';
				api.nextPlayer(State.players.indexOf(player));
			},
			goWork: function (player) {
				api.message({text: 'An empty wallet will get you nowhere fast', header: player.playerName + ' gone broke!!'});
				player.currentPosition = 'work';
				api.nextPlayer(State.players.indexOf(player));
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