'use strict';

angular.module('watcher.addMovieController', ['ngMaterial'])
.controller('addMovieController', ['$http', '$scope', '$rootScope', '$mdDialog', 'Movie', 'PersonSeenMovie', function($http, $scope, $rootScope, $mdDialog, Movie, PersonSeenMovie) {
  $scope.showMovieResults = true;
  $scope.showNothing = true;
  $scope.searchText = null;

  $scope.querySearch = function() {
    if($scope.searchString.length > 2) {
      $scope.showNothing = false;
      $http.get('http://www.omdbapi.com/?s=*'+$scope.searchString+"*")
      .then(function(response) {
        $scope.foundMovies = response.data["Search"];
        return response.data["Search"];
      });
    }
  }

  function addToScopeIfNotDuplicate(data) {
    var alreadyPresent;
    angular.forEach($rootScope.user.seenMovies, function(movie) {
      if(data.Title.toLowerCase() == movie.Title.toLowerCase()) {
        alreadyPresent = true;
      }
    });
    if(!alreadyPresent) {
      $rootScope.user.seenMovies.push(data);
    }
  }

  $scope.getImdbMovie = function() {
      var movie = new Movie($scope.movieDetail);
      movie.$save(function(data, headers){
        PersonSeenMovie.update({personId: $rootScope.user.personId, movieId: data.movieId}, $rootScope.user);
        addToScopeIfNotDuplicate(data);
        $scope.hide();
    });
  }

  $scope.add = function() {
    $scope.getImdbMovie();
  }

  $scope.searchMovie = function(imdbID) {
    $http.get('http://www.omdbapi.com/?i='+imdbID)
    .then(function(response) {
      $scope.foundMovies = [];
      $scope.movieDetail = response.data
      $scope.showMovieResults = false;
    }, function(error) {
      alert("Error!");
    });
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}]);
