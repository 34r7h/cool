'use strict';

/**
* @ngdoc directive
* @name cool.directive:board
* @description
* # board
*/
angular.module('cool')
.directive('board', function ()
{
    return {
        templateUrl: 'scripts/board/board-d.html',
        
        restrict: 'E'
    };
});