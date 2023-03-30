// import angular, { IScope, IModule } from 'angular';

interface IMainControllerScope extends ng.IScope {

}

class MainController {
    constructor(private $scope: IMainControllerScope) {
    }
}

interface IHomeControllerScope extends ng.IScope {

}

class HomeController {
    constructor(private $scope: IHomeControllerScope) {
    }
}

interface IDateHelperControllerScope extends ng.IScope {

}

class DateHelperController {
    constructor(private $scope: IDateHelperControllerScope) {
    }
}

interface IRegexBuilderControllerScope extends ng.IScope {

}

class RegexBuilderController {
    constructor(private $scope: IRegexBuilderControllerScope) {
    }
}

interface IRegexMatchControllerScope extends ng.IScope {

}

class RegexMatchController {
    constructor(private $scope: IRegexMatchControllerScope) {
    }
}

interface IRegexTestControllerScope extends ng.IScope {

}

class RegexTestController {
    constructor(private $scope: IRegexTestControllerScope) {
    }
}

interface IUriHomeControllerScope extends ng.IScope {

}

class UriHomeController {
    constructor(private $scope: IUriHomeControllerScope) {
    }
}

interface IUriBuilderControllerScope extends ng.IScope {

}

class UriBuilderController {
    constructor(private $scope: IUriBuilderControllerScope) {
    }
}

interface IUriParserControllerScope extends ng.IScope {

}

class UriParserController {
    constructor(private $scope: IUriParserControllerScope) {
    }
}

var app: ng.IModule = angular.module('snHelper', ["ngRoute"]);

app.controller("MainController", MainController);

app.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
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