'use strict';

/**
* @ngdoc directive
* @name cool.directive:start
* @description
* # start
*/
angular.module('cool')
.directive('start', function ()
{
    return {
        templateUrl: 'scripts/start/start-d.html',
        restrict: 'E'
    };
});