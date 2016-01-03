'use strict';

/**
* @ngdoc directive
* @name cool.directive:messages
* @description
* # messages
*/
angular.module('cool')
.directive('messages', function ()
{
    return {
        templateUrl: 'scripts/messages/messages-d.html',
        restrict: 'EA'
    };
});