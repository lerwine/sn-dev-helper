// import angular, { IScope, IModule } from 'angular';

interface IHomeControllerScope extends ng.IScope {

}

class MainController {
    constructor(private $scope: IHomeControllerScope) {
    }
}

var app: ng.IModule = angular.module('snHelper', []);

app.controller("MainController", MainController);