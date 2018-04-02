'use strict';

var gatorEats = angular.module('gatorEats', ['ngRoute', 'ngMaterial', 'ngMessages'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/extras', {
                templateUrl: 'views/extras.html',
                controller: 'ExtrasController'
            })
            .when('/today', {
                templateUrl: 'views/todayMenu.html',
                controller: 'TodayMenuController'
            })
            .when('/week', {
                templateUrl: 'views/weekMenu.html',
                controller: 'WeekMenuController'
            })
            .when('/foodItem', {
                templateUrl: 'views/foodItem.html',
                controller: 'FoodItemController'
            })
            .when('/trending', {
                templateUrl: 'views/trending.html',
                controller: 'TrendingController'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'SettingsController'
            })
            .otherwise({redirectTo: '/'});

        // Use the HTML5 History API
        $locationProvider.html5Mode(true);
    });