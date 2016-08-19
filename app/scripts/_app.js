/**
 * @ngdoc overview
 * @name cool
 * @description
 * # cool
 *
 * Main module of the application.
 */
'use strict';
screen.lockOrientation ? screen.lockOrientation('landscape') : null;
angular.module('cool', [
	'ngAnimate',
	'ngResource',
	'ui.router',
	'ngAdsense'
]);

angular.module('cool').filter('reverse', function () {
	return function (items) {
		return items.slice().reverse();
	};
});