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
			rollDice: function () {
				// Random roll of two dice, with up to 4 players.
				// One set of sie per corner.
				var total = 0;
				var doubles = false;
				var firstDie = Math.floor(Math.random() * 6) + 1;
				State.dice[0] = firstDie;
				// console.log('rolling first die...', firstDie);
				var secondDie = Math.floor(Math.random() * 6) + 1;
				State.dice[1] = secondDie;

				// console.log('second die...', secondDie);
				total = firstDie + secondDie;
				// console.log('total roll', total);
				State.currentRoll = total;
				return {total:total, doubles: doubles};
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
					scores.push(score);
				});
				scores.sort(function (a,b) {
					return a-b;
				});
				angular.forEach(scores, function (score) {
					playerOrder.unshift({currentPosition: 1, playerName:rollPlayers[score]});
				});
				console.log('%c',playerOrder, 'color:#00ff00' );
				var playerColors = ['lightPurple', 'lightOrange', 'lightBlue', 'lightGreen', 'lightYellow', 'lightPink', 'pink'];

				angular.forEach(playerOrder, function (player) {
					var randomColor = Math.floor(Math.random()*(playerColors.length-1));
					player.color = playerColors[randomColor];
					playerColors.splice(randomColor,1);
				});
				State.players = playerOrder;

				State.turn = playerOrder[0];
				console.log('%c Game ready to begin. Player '+playerOrder[0].playerName+' goes first.','font-size:2em');
				api.message({
					text: playerOrder[0].playerName+' goes first.',
					header: 'Game ready to begin.'
				});
				$state.go('cool.board');
				State.gameStarted = true;

			},
			takeTurn: function (key, player) {
				State.messages = {};
				var playerRoll = api.rollDice();
				if(player.currentPosition === 'timeout'){

				}
				var direction = true;
				if (player.currentPosition - playerRoll.total > 0){
					direction = $window.confirm(player.playerName + ' rolled '+playerRoll.total+'. Press OK to move forward. CANCEL to move backwards');
					console.log(direction);

				}
				player.currentPosition = direction === true ?
					player.currentPosition + playerRoll.total :
					player.currentPosition - playerRoll.total;

				Models.spaces[player.currentPosition] === 'cool?' ?
					api.card() :
					Models.spaces[player.currentPosition] === 'trap' ?
						(
							console.log('Its a trap!!'),
								api.message({text:'Oh no, '+player.playerName+' sent back to start!', header:'It\'s a trap!!'}),
								api.goHome(player)
						) :
						null;
				if (playerRoll.doubles === true) {
					console.log('player '+player.playerName+' goes again.');
					api.message({
						text:player.playerName+' goes again.',
						header: 'Doubles!!'
					});
				} else {
					if(State.players[key + 1]){
						State.turn = State.players[key + 1];
					} else {
						State.turn = State.players[0];
					}
				}
			},
			message: function (message) {
				console.info('messaging', message);
				var time = Date.now();
				State.messages[time] = {
					text: message.text,
					header: message.header,
					type: message.type,
					expires: (time + message.duration)
				}
			},
			card: function(){
				console.log('%c cards', 'background: cream');
				var randomCard = Models.cards[Math.floor(Math.random()*Models.cards.length)];
				State.card = randomCard;
			},
			goHome: function (player) {
				player.currentPosition = 1;
			},
			killPlayer: function(player){
				console.log(player.playerName, 'dead');
				api.message({text: 'Rough, son. Better luck on the next one', header:player.playerName + 'is dead.'});
				State.players.splice(State.players.indexOf(player), 1);
			},
			goPass: function(player){
				console.log('getting a pass, ya baby!!');
				api.message({text:'Getting a pass, finishing fast!!', header: player.playerName + ' is lucky.'})
			},
			goJail: function (player) {
				console.log('going to jail, no baby!!');
				api.message({text:'Getting sent to jail sucks, too bad now you\'re stuck!!', header: player.playerName + ' is locked-up.'});
				player.currentPosition = 'jail';

			},
			goSchool: function (player) {
				console.log('back to school, learnin lessons baby!!');
				api.message({text:'Smarten up, level up', header: player.playerName + ' is getting schooled.'});
				player.currentPosition = 'school';
			},
			goWork: function (player) {
				console.log('gotta work, life ain\'t free!');
				api.message({text:'An empty wallet will get you nowhere fast', header: player.playerName + ' gone broke!!'});
				player.currentPosition = 'work';
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