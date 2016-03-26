/**
 * @ngdoc overview
 * @name cool
 * @description
 * # cool
 *
 * Main module of the application.
 */
'use strict';

angular.module('cool', [
    'ngAnimate',
    'ngResource',
    'ui.router'
  ]);

angular.module('cool').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});