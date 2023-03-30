"use strict";
// import angular, { IScope, IModule } from 'angular';
class MainController {
    $scope;
    constructor($scope) {
        this.$scope = $scope;
    }
}
var app = angular.module('snHelper', []);
app.controller("MainController", MainController);
