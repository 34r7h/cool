/**
 * @ngdoc service
 * @name cool.Rules
 * @description
 * # Rules
 * Factory in the cool.
 */
angular.module('cool')
    .factory('Rules', function (State)
    {
        'use strict';
        var rules = {
            // checks the current State to apply various rules
            turnLogic: function (player, roll, position) {
                // checks the players board position and roll for legal moves
                if(State.players[key + 1]){
                    State.turn = State.players[key + 1];
                } else {
                    State.turn = State.players[0];
                }
            },
            cardLogic: function () {
                // quick check on card-based routing
            },
            winLogic: function () {
                // checks for a win condition
            }
        };

        return rules;
    });