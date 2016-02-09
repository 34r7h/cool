'use strict';

/**
* @ngdoc directive
* @name cool.directive:rules
* @description
* # rules
*/
angular.module('cool')
.directive('rules', function ()
{
    return {
        templateUrl: 'scripts/rules/rules-d.html',
        restrict: 'EA'
    };
});