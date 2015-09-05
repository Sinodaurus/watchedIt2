'use strict';

angular.module('watcher.loginController', ['ngRoute', 'ngMessages'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'pages/login.html',
    controller: 'loginController'
  });
}])
.controller('loginController', ['Person', 'LoginService', '$resource', '$scope', '$rootScope', '$location', function(Person, LoginService, $resource, $scope, $rootScope, $location) {
  function getPassword(requestConfig) {
    return 'Basic ' + btoa($scope.username + ":" + $scope.password);
  };

  var Login = $resource('http://localhost:8080/auth/login/:userName', {}, {
    get: {
      method: 'GET',
      headers: {'Authorization': getPassword}
    }
  });

  $rootScope.authenticated = false;

  var authenticate = function(callback) {
    Login.get({userName: $scope.username}).$promise.then(function(response) {
      $scope.password = "";
      $rootScope.authenticated = true;
      callback && callback(response);
    }, function(error) {
      $rootScope.authenticated = false;
      callback && callback(error);
    });
  }

  $scope.logIn = function() {
    authenticate(function(data) {
      if($rootScope.authenticated) {
        $rootScope.user = data.person;
        $rootScope.token = data.token;
        $location.path("/movieList");
        $scope.hasError = false;
      } else {
          $location.path("/login");
          $scope.hasError = true;
      }
    })
  }

  $scope.createUser = function() {
    var newPerson = new Person();
    newPerson.firstName = $scope.form.firstName;
    newPerson.lastName = $scope.form.lastName;
    newPerson.userName = $scope.form.userName;
    newPerson.password = $scope.form.password;
    newPerson.$save(function(data, headers) {
      $rootScope.user = data.person;
      $rootScope.token = data.token;
      $location.path("/movieList");
      $scope.errorUser = false;
    }, function(error) {
      $location.path("/login");
      $scope.errorUser = true;
    });
  };

  $scope.newUserForm = false;

  $scope.switchNewUserForm = function() {
    $scope.newUserForm = true;
  }

  $scope.switchLoginForm = function() {
    $scope.newUserForm = false;
  }
}]);
