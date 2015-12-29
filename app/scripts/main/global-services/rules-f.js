/**
 * @ngdoc service
 * @name cool.Rules
 * @description
 * # Rules
 * Factory in the cool.
 */
angular.module('cool')
    .factory('Rules', function ()
    {
        'use strict';

        // INITIALIZATION
        console.log('Rules: Is it cool?');


        // ACTUAL DEFINITION
        var rules = {
            // checks the current State to apply various rules
            moveLogic: function () {
                // checks the players board position for legal moves
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