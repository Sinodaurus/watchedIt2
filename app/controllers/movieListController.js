'use strict';

angular.module('watcher.movieListController', ['ngRoute', 'ngResource', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/movieList', {
    templateUrl: 'pages/movieList.html',
    controller: 'movieListController'
  });
}])

.controller('movieListController', ['Person', 'Movie', 'PersonSeenMovie', 'PersonsFinder', 'LoginService', '$scope', '$rootScope', '$http', '$mdDialog',
      function(Person, Movie, PersonSeenMovie, PersonsFinder, LoginService, $scope, $rootScope, $http, $mdDialog) {
  $scope.errorUser = false;

  LoginService.checkIfAuthenticated();

  Person.query(function(persons) {
    $scope.persons = persons;
  });

  $scope.deletePerson = function(person) {
    Person.delete({id: person.personId});
    for(var i = 0; i < $scope.persons.length; i++) {
      if($scope.persons[i].personId === person.personId) {
        var index = i;
      }
    }
    $scope.persons.splice(index,1);
  };

  $scope.deleteMovie = function(movieId) {
    PersonSeenMovie.delete({personId: $rootScope.user.personId, movieId: movieId});
    for(var i = 0; i < $rootScope.user.seenMovies.length; i++) {
      if($rootScope.user.seenMovies[i].movieId === movieId) {
        var index = i;
      }
    }
    $rootScope.user.seenMovies.splice(index,1);
  };

  $scope.searchImdb = function() {
    $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?s='+$scope.movie
    }).success(function(response) {
      $scope.foundMovies = response["Search"];
    });
  };

  $scope.searchMovies = function(ev) {
    $mdDialog.show({
      controller: 'addMovieController',
      templateUrl: 'pages/templates/addMovie.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
}]);
