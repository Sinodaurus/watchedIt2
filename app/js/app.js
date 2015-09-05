'use strict';

angular.module('watcher', [
  'ngRoute',
  'watcher.loginController',
  'watcher.movieListController',
  'watcher.service',
  'watcher.loginService',
  'watcher.addMovieController'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
