'use strict';

/**
* @ngdoc directive
* @name cool.directive:debug
* @description
* # debug
*/
angular.module('cool')
.directive('debug', function ()
{
    return {
        restrict: 'E',
        transclude: true,
        template: '<ng-transclude ng-if="$root.debug"></ng-transclude>'

    };
});