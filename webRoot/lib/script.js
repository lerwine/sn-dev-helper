"use strict";
// import angular, { IScope, IModule } from 'angular';
class MainController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class HomeController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class DateHelperController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class RegexBuilderController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class RegexMatchController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class RegexTestController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class UriHomeController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class UriBuilderController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
class UriParserController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
var app = angular.module('snHelper', ["ngRoute"]);
app.controller("MainController", MainController);
app.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $routeProvider
            // .when('/newSession/:deckId', {
            //     templateUrl: "newSession.htm",
            //     controller: NewSessionController,
            //     controllerAs: "controller"
            // })
            .when('/home', {
            templateUrl: "templates/home.htm",
            controller: HomeController,
            controllerAs: "controller"
        })
            .when('/date', {
            templateUrl: "templates/date.htm",
            controller: DateHelperController,
            controllerAs: "controller"
        })
            .when('/regex', {
            templateUrl: "templates/regex/build.htm",
            controller: RegexBuilderController,
            controllerAs: "controller"
        })
            .when('/regex/match', {
            templateUrl: "templates/regex/match.htm",
            controller: RegexMatchController,
            controllerAs: "controller"
        })
            .when('/regex/test', {
            templateUrl: "templates/regex/test.htm",
            controller: RegexTestController,
            controllerAs: "controller"
        })
            .when('/uri', {
            templateUrl: "templates/uri/home.htm",
            controller: UriHomeController,
            controllerAs: "controller"
        })
            .when('/uri/build', {
            templateUrl: "templates/uri/build.htm",
            controller: UriBuilderController,
            controllerAs: "controller"
        })
            .when('/uri/parse', {
            templateUrl: "templates/uri/parse.htm",
            controller: UriParserController,
            controllerAs: "controller"
        })
            .when('/', {
            redirectTo: "/home"
        });
        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    },
]);
