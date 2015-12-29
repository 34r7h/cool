/**
 * @ngdoc service
 * @name cool.State
 * @description
 * # State
 * Factory in the cool.
 */
angular.module('cool')
    .factory('State', function ()
    {
        'use strict';

        // INITIALIZATION
        console.log('State: Is it cool?');

        // ACTUAL DEFINITION
        var state = {
            // current state of the game
            players: {
                history:[],
                currentPosition: {}
            },
            board: {
                cards:{},
                spaces:{}
            }
        };

        return state;
    });