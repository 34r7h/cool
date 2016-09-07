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
	'ngAdsense',
	'admob',
	'ionic'
]).run(function($ionicPlatform, $ionicPopup, State) {
	$ionicPlatform.ready(function() {
		console.log('ionic ready?');
		if(window.AdMob) {
			console.log('admob in effect');
			State.mobile = true;
			var admob_key = device.platform == "Android" ? "ca-app-pub-3429898877503693/8125637657" : "ca-app-pub-3429898877503693/4896740055";
			var admob = window.plugins.AdMob;
			admob.createBannerView(
				{
					'publisherId': admob_key,
					'adSize': admob.AD_SIZE.SMART_BANNER,
					'bannerAtTop': false
				},
				function() {
					admob.requestAd(
						{ 'isTesting': false },
						function() {
							admob.showAd(true);
						},
						function() { console.log('failed to request ad'); }
					);
				},
				function() { console.log('failed to create banner view'); }
			);
		} else {
			State.browser = true;
			console.log('no admob');
		}
	});
});

angular.module('cool').filter('reverse', function () {
	return function (items) {
		return items.slice().reverse();
	};
});