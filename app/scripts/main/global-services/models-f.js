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
				school: {color: 'school', tForm: {translateX:'45vw', translateY:'80vh'}},
				work: {color: 'work', tForm: {translateY:'45vh'}},
				jail: {color: 'jail', tForm: {translateX:'90vw', translateY:'45vh'}},
				1: {color: colors.blue, origin:{top:'65%', left:'13%'}, tForm: {rotate:'-21deg'}},
				2: {color: colors.yellow, origin:{top:'66.5%', left:'8.5%'}, tForm: {rotate:'-35deg'}},
				3: {color: colors.black, origin:{top:'70%', left:'6%'}, tForm: {rotate:'-72deg'}},
				4: {color: colors.red, origin:{top:'75%', left:'5.5%'}, tForm: {rotate:'0deg'}},
				5: {color: 'cool?', origin:{top:'80%', left:'6%'}, tForm: {rotate:'-21deg'}},
				6: {color: colors.blue, origin:{top:'84%', left:'9.5%'}, tForm: {rotate:'-35deg'}},
				7: {color: colors.yellow, origin:{top:'86%', left:'13.5%'}, tForm: {rotate:'-72deg'}},
				8: {color: colors.black, origin:{top:'85%', left:'17.5%'}, tForm: {rotate:'-21deg'}},
				9: {color: 'cool?'},
				10: {color: colors.red},
				11: {color: colors.blue},
				12: {color: colors.black},
				13: {color: colors.yellow},
				14: {color: 'cool?'},
				15: {color: colors.black},
				16: {color: colors.yellow},
				17: {color: 'pass'},
				18: {color: colors.black},
				19: {color: colors.red},
				20: {color: 'cool?'},
				21: {color: colors.yellow},
				22: {color: colors.black},
				23: {color: 'cool?'},
				24: {color: colors.blue},
				25: {color: colors.red},
				26: {color: colors.yellow},
				27: {color: colors.blue},
				28: {color: 'cool?'},
				29: {color: colors.black},
				30: {color: colors.yellow},
				31: {color: colors.red},
				32: {color: 'pass'},
				33: {color: colors.blue},
				34: {color: 'cool?'},
				35: {color: colors.black},
				36: {color: colors.yellow},
				37: {color: 'cool?'},
				38: {color: colors.yellow},
				39: {color: colors.blue},
				40: {color: colors.black},
				41: {color: colors.red},
				42: {color: 'cool?'},
				43: {color: colors.blue},
				44: {color: colors.yellow},
				45: {color: colors.red},
				46: {color: 'cool?'},
				47: {color: colors.black},
				48: {color: 'trap'},
				49: {color: 'sunglasses'},
				50: {color: 'pass'},
				51: {color: colors.yellow},
				52: {color: colors.black},
				53: {color: colors.red},
				54: {color: 'cool?'},
				55: {color: colors.blue},
				56: {color: colors.yellow},
				57: {color: 'trap'},
				58: {color: 'win'}
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