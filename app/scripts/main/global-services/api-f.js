/**
 * @ngdoc service
 * @name cool.Api
 * @description
 * # Api
 * Factory in the cool.
 */
angular.module('cool')
    .factory('Api', function ()
    {
        'use strict';

        // INITIALIZATION
        console.log('Api: Is it cool?');


        // ACTUAL DEFINITION
        var api = {
            rollDice: function () {
                // Random roll of two dice, with up to 4 players.
                // One set of sie per corner.

            },
            routePlayer: function () {
                // This handles the player movements between different
                // spaces and cards.

            },
            startGame: function () {
                // Chooses players and initiates a new game.
            }
        };

        return api;
    });