/**
 * @ngdoc overview
 * @name cool.routes
 * @description
 * # cool.routes
 *
 * Routes module. All app states are defined here.
 */

angular.module('cool')
    .config(function ($stateProvider, $urlRouterProvider)
    {
        'use strict';

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('cool', {
                url: '/',
                template:'<h3>Cool: Is it <a href="">{{cool.cool}}</a> cool?</h3><ui-view></ui-view><h4>Direct Injections</h4><p ng-repeat="(key, di) in cool.di"><b>{{key}}: </b>{{di}}</p>',
                controller: coolCtrl,
                controllerAs: 'cool'
            })
            .state('cool.board', {
                url: 'board',
                template:'Board: Is it cool?<ui-view></ui-view>'
            })
            .state('cool.board.space', {
                /*// Various space types will
                 // have params set as well
                 // to help with styling*/
                url: '/:space',
                template:'Space: Is it cool?'
            })
            .state('cool.cards', {
                url: 'cards',
                template: 'Cards: Is it cool?<ui-view></ui-view>'
            })
            .state('cool.cards.card', {
                /*// Various card types will
                // have params set as well
                // to help with styling*/
                url: '/:card',
                template: 'Card: Is it cool?'
            })
            /* STATES-NEEDLE - DO NOT REMOVE THIS */;

    });

var coolCtrl = function (State, Rules, Api, Models) {
    var vm = this;
    vm.di = {state: State, rules:Rules, api:Api, models:Models};
    console.log(vm.di);
    vm.cool = 'very';
    console.log('coolCtrl: Is it '+vm.cool+' cool?');
};