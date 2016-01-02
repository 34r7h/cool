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
        // console.log('Models: Is it cool?');
        var string =  '';
        var number =  0;
        var array = [];


        // ACTUAL DEFINITION
        var models = {
            // Has every possible combination of app renderings
            // via these elements
            player: {
                name: string,
                currentPosition: number,
                color:string
            },
            cards: {
                type: string,
                text: string,
                action: string
            },
            spaces: {
                1: 'blue',
                2: 'yellow',
                3: 'black',
                4: 'red',
                5: 'cool?',
                6: 'blue',
                7: 'yellow',
                8: 'black',
                9: 'cool?',
                10: 'red',
                11: 'blue',
                12: 'black',
                13: 'yellow',
                14: 'cool',
                15: 'black',
                16: 'yellow',
                17: 'pass',
                18: 'black',
                19: 'red',
                20: 'cool?',
                21: 'yellow',
                22: 'black',
                23: 'cool?',
                24: 'blue',
                25: 'red',
                26: 'yellow',
                27: 'blue',
                28: 'cool?',
                29: 'black',
                30: 'yellow',
                31: 'red',
                32: 'pass',
                33: 'blue',
                34: 'cool?',
                35: 'black',
                36: 'yellow',
                37: 'cool?',
                38: 'yellow',
                39: 'blue',
                40: 'black',
                41: 'red',
                42: 'cool',
                43: 'blue',
                44: 'yellow',
                45: 'red',
                46: 'cool',
                47: 'black',
                48: 'trap',
                49: 'blue',
                50: 'yellow',
                51: 'black',
                52: 'red',
                53: 'cool?',
                54: 'blue',
                55: 'yellow',
                56: 'trap',
                57: 'win'
            },
            sections: {
                c: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                o1: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                gap1: [24],
                o2: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
                gap2: [38, 39, 40],
                l: [41, 42, 43, 44, 45, 46, 47, 48],
                question: [49, 50, 51, 52, 53, 54, 55, 56],
                win: [57]
            },
            start: {
                players: number,
                colors: array,
                text: string
            }
        };

        return models;
    });