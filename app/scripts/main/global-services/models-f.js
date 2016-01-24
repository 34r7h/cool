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
				school: {color: 'school', tForm: {translateX:'45vw', translateY:'80vh'}, poly:'50,0 51,0 51,1 51,0 50,0'},
				work: {color: 'work', tForm: {translateY:'45vh'}, poly:'0,48 0,52 4,52 4,48 0,48'},
				jail: {color: 'jail', tForm: {translateX:'90vw', translateY:'45vh'}, poly:'96,48 100,48 100,52 96,52 96,48'},
				1: {color: colors.blue, poly:'13,5 8,5 10,11 12,11 13,5'},
				2: {color: colors.yellow, poly:'8,5 4,8 7,13 10,11 8,5'},
				3: {color: colors.black, poly:'4,8 1.8,13 5.5,16 7,13 4,8'},
				4: {color: colors.red, poly:'1.8,13 0,19 5,19 5.5,16 1.8,13'},
				5: {color: 'cool?', poly:'0,19 1,26 5.3,22.5 5,19 0,19'},
				6: {color: colors.blue, poly: '1,26 3.5,31, 7,25 5.3,22.5 1,26'},
				7: {color: colors.yellow, poly: '3.5,31 9,33 10,26 7,25 3.5,31'},
				8: {color: colors.black, poly: '9,33 13,32 12,25.5 10,26 9,33'},
				9: {color: 'cool?', poly:'13,32 18,28 15,24 12,25.5 13,32'},
				10: {color: colors.red, poly:'18,28 21,25 20,20 15,24 18,28'},
				11: {color: colors.blue, poly:'21,25 25,21 25.1,15 20,20 21,25'},
				12: {color: colors.black, poly:'21,25 24.5,30 27,24 25,21 21,25'},
				13: {color: colors.yellow, poly:'24.5,30 29,31.5 29.5,25 27,24 24.5,30'},
				14: {color: 'cool?', poly:'29,31.5 34,31 32,25 29.5,25 29,31.5'},
				15: {color: colors.black, poly:'34,31 37.5,27.5 34,23 32,25 34,31'},
				16: {color: colors.yellow, poly:'37.5,27.5 41,19 35,21 34,23 37.5,27.5'},
				17: {color: 'pass', poly:'41,19 40,13 35.5,15 35,21 41,19'},
				18: {color: colors.black, poly:'40,13 37,8 34,12 35.5,15, 40,13'},
				19: {color: colors.red,poly:'37,8 33,5 32,11 34,12 37,8'},
				20: {color: 'cool?', poly:'33,5 28,5 29,11 32,11 33,5'},
				21: {color: colors.yellow, poly:'28,5 23,8 27,12 29,11 28,5'},
				22: {color: colors.black, poly:'23,8 21,12 25.1,15 27,12 23,8'},
				23: {color: 'cool?', poly:'21,12 20,20 25.1,15 25.1,15 21,12'},
				24: {color: colors.blue, poly:'41,19 44.5,18.5 45,13.5 40,13 41,19'},
				25: {color: colors.red, poly:'44.5,18.5 50,21 49,15 45,13.5 44.5,18.5'},
				26: {color: colors.yellow, poly: '50,21 51,22 47,26 44.5,18.5 50,21'},
				27: {color: colors.blue, poly:'51,22 52,23 51,29 47,26 51,22'},
				28: {color: 'cool?', poly:'51,29 56,30 54.5,23.5 52,23 51,29'},
				29: {color: colors.black, poly:'56,30 60,28 57,23 54.5,23.5 56,30'},
				30: {color: colors.yellow, poly:'60,28 63,25 59,21 57,23 60,28'},
				31: {color: colors.red, poly:'63,25 64.5,19 60,18 59,21 63,25'},
				32: {color: 'pass', poly:'64.5,19 64,13 60,15 60,18 64.5,19'},
				33: {color: colors.blue, poly:'64,13 62,8 59,12 60,15 64,13'},
				34: {color: 'cool?', poly:'62,8 57,4 56,10 59,12 62,8'},
				35: {color: colors.black, poly:'57,4 52,4 53,9.5 56,10 57,4'},
				36: {color: colors.yellow, poly:'52,4 47,8 51,12 53,9.5 52,4'},
				37: {color: 'cool?', poly:'47,8 45,13.5 49,15 51,12 47,8'},
				38: {color: colors.yellow, poly:'64.5,19 68.5,13.5 66,10 64,13 64.5,19'},
				39: {color: colors.blue, poly:'68.5,13.5 71,9.5 69,6.5 66,10 68.5,13.5'},
				40: {color: colors.black, poly:'71,9.5 72,7 71.5,3 69,6.5 71,9.5'},
				41: {color: colors.red, poly:'72,7 76.5,6.5 76,2.5 71.5,3 72,7'},
				42: {color: 'cool?', poly:'72,7 72.5,10.5 77,10.5 76.5,6.5 72,7'},
				43: {color: colors.blue, poly:'72.5,10.5 73,15 77.5,14.5 77,10.5 72.5,10.5'},
				44: {color: colors.yellow, poly:'73,15 73.5,19 78,19 77.5,14.5 73,15'},
				45: {color: colors.red, poly:'73.5,19 74,25 78.5,22 78,19 73.5,19'},
				46: {color: 'cool?', poly:'74,25 74.5,28.5 79,28 78.5,22 74,25'},
				47: {color: colors.black, poly:'79,28 83,27.5 82,22 78.5,22 79,28'},
				48: {color: 'trap', poly:'83,27.5 86,28 85.5,21.5 82,22 83,27.5'},
/*
				49: {color: 'sunglasses', poly:''},
*/
				50: {color: 'pass',poly:'84,11 88,11 88.5,8 85,4.5 84,10'},
				51: {color: colors.yellow, poly:'88.5,8 90,7 89.5,1.5 85,4.5 88.5,8'},
				52: {color: colors.black, poly:'90,7 92,7.5 94,3.5 89.5,1.5 90,7'},
				53: {color: colors.red, poly:'92,7.5 93,9.5 97.5,9.5 94,3.5 92,7.5'},
				54: {color: 'cool?', poly:'93,9.5 92.5,12 96,16 97.5,9.5 93,9.5'},
				55: {color: colors.blue,poly:'92.5,12 90,15.5 94,19 96,16 92.5,12'},
				56: {color: colors.yellow, poly:'90,15.5 89.5,21 94,21 94,19 90,15.5'},
				57: {color: 'trap',poly:'89.5,21 90.5,27 95,26.5 94,21 89.5,21'},
				58: {color: 'win', poly:'88,35 94,30 100,35 100,45 94,50 88,45 88,35'}
			},
			sections: {
				timeouts: ['school', 'work', 'jail'],
				c: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				o1: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
				gap1: [24],
				o2: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
				gap2: [38, 39, 40],
				l: [41, 42, 43, 44, 45, 46, 47, 48],
/*
				sunglasses:[49],
*/
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