'use strict';

/**
* @ngdoc directive
* @name cool.directive:fpv
* @description
* # fpv
*/
angular.module('cool')
    .directive('fpv', function ()
    {
        return {
            templateUrl: 'scripts/fpv/fpv-d.html',

            restrict: 'EA',
            link: function (scope, el, attrs)
            {

            },
            controller: function ($scope)
            {
                
            }
        };
    });