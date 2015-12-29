/**
 * @ngdoc service
 * @name cool.Models
 * @description
 * # Models
 * Factory in the cool.
 */
angular.module('cool')
    .factory('Models', function ()
    {
        'use strict';

        // INITIALIZATION
        console.log('Models: Is it cool?');


        // ACTUAL DEFINITION
        var models = {
            // Has every possible combination of app renderings
            // via these elements
            players: {},
            cards: {},
            board: {},
            start: {},
            dice: {}
        };

        return models;
    });