/**
 * @ngdoc service
 * @name cool.Models
 * @description
 * # Models
 * Factory in the cool.
 */
angular.module('cool')
	.factory('Models', function () {
		'use strict';

		// INITIALIZATION
		// console.log('Models: Is it cool?');
		var string = '';
		var number = 0;
		var array = [];
		var colors = {
			red: 'rgba(180, 23, 2, 1)',
			blue: 'rgba(1, 19, 108, 1)',
			yellow: 'rgba(255, 203, 0, 1)',
			black: 'rgba(0,1,2,1)',
			lightPurple: 'rgba(119, 68, 150, 1)',
			lightOrange: 'rgba(255, 87, 34, 1)',
			lightBlue: 'rgba(0, 87, 171, 1)',
			lightGreen: 'rgba(0, 234, 0, 1)',
			lightYellow: 'rgba(255, 251, 0, 1)',
			lightPink: 'rgba(255, 184, 191, 1)',
			pink: 'rgba(255, 43, 106, 1)'
		};


		// ACTUAL DEFINITION
		var models = {
			// Has every possible combination of app renderings
			// via these elements
			player: {
				name: string,
				currentPosition: number,
				color: string
			},
			message: {
				text: string,
				header: string,
				type: string,
				duration: number
			},
			card: {
				topText: [],
				bottomText: [],
				action: string,
				image: string
			},
			cards: [
				{
					topText: [
						'You went to college',
						'To be a boss',
						'Then paid the cost',
						'To be the boss'
					],
					bottomText: [
						'That\'s cool!',
						'You can go to pass'
					],
					action: 'goPass',
					background: 'green'
				},
				{
					topText: [
						'You applied for a job',
						'And got hired',
						'They said you can work there',
						'Until you retire!'
					],
					bottomText: [
						'That\'s cool!',
						'Go to pass'
					],
					action: 'goPass',
					background: 'green'
				},
				{
					topText: [
						'You joined a gang and got shot and died. Then your family cried!'
					],
					bottomText: [
						'That\'s not cool!',
						'You\'re out of the game!',
						'Sorry!'
					],
					action: 'killPlayer',
					image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/US_Capitol_Building_at_night_Jan_2006.jpg/1018px-US_Capitol_Building_at_night_Jan_2006.jpg'
				},
				{
					topText: [
						'Locked in the can.'
					],
					bottomText: [
						'jailin'
					],
					action: 'goJail',
					image: 'http://www.liberalamerica.org/wp-content/uploads/2015/03/e15243d5-58a2-4215-8989-0d666bbb07d6.jpg'
				},
				{
					topText: [
						'Locked in the can.'
					],
					bottomText: [
						'schoolin'
					],
					action: 'goSchool',
					image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjX4Ji27pvKAhVK5WMKHdKlCl4QjRwIBw&url=http%3A%2F%2Fwww.englishinbritain.co.uk%2Fschool_detail.cfm%3Fschoolid%3D421&bvm=bv.111396085,d.cGc&psig=AFQjCNGI9S-76H1wjc9C80PgZYGiFSy1oA&ust=1452399090198131'
				},
				{
					topText: [
						'Locked in the can.'
					],
					bottomText: [
						'workin'
					],
					action: 'goWork',
					image: 'https://pixabay.com/static/uploads/photo/2014/07/05/10/31/work-384745_640.jpg'
				}
			],
			spaces: {
				school: 'school',
				work: 'work',
				jail: 'jail',
				1: colors.blue,
				2: colors.yellow,
				3: colors.black,
				4: colors.red,
				5: 'cool?',
				6: colors.blue,
				7: colors.yellow,
				8: colors.black,
				9: 'cool?',
				10: colors.red,
				11: colors.blue,
				12: colors.black,
				13: colors.yellow,
				14: 'cool?',
				15: colors.black,
				16: colors.yellow,
				17: 'pass',
				18: colors.black,
				19: colors.red,
				20: 'cool?',
				21: colors.yellow,
				22: colors.black,
				23: 'cool?',
				24: colors.blue,
				25: colors.red,
				26: colors.yellow,
				27: colors.blue,
				28: 'cool?',
				29: colors.black,
				30: colors.yellow,
				31: colors.red,
				32: 'pass',
				33: colors.blue,
				34: 'cool?',
				35: colors.black,
				36: colors.yellow,
				37: 'cool?',
				38: colors.yellow,
				39: colors.blue,
				40: colors.black,
				41: colors.red,
				42: 'cool?',
				43: colors.blue,
				44: colors.yellow,
				45: colors.red,
				46: 'cool?',
				47: colors.black,
				48: 'trap',
				49: 'sunglasses',
				50: 'pass',
				51: colors.yellow,
				52: colors.black,
				53: colors.red,
				54: 'cool?',
				55: colors.blue,
				56: colors.yellow,
				57: 'trap',
				58: 'win'
			},
			sections: {
				timeouts: ['school', 'work', 'jail'],
				c: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				o1: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
				gap1: [24],
				o2: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
				gap2: [38, 39, 40],
				l: [41, 42, 43, 44, 45, 46, 47, 48],
				sunglasses:[49],
				question: [50, 51, 52, 53, 54, 55, 56, 57],
				win: [58]
			},
			start: {
				players: number,
				colors: array,
				text: string
			},
			dice: [number, number],
			colors: colors
		};

		return models;
	});