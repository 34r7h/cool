'use strict';

/**
* @ngdoc directive
* @name cool.directive:card
* @description
* # card
*/
angular.module('cool')
.directive('card', function ()
{
    return {
        templateUrl: 'scripts/card/card-d.html',
        restrict: 'EA'
    };
});