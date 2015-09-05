angular.module('watcher.loginService', [])
.factory('LoginService', ['$rootScope', '$location', '$resource', function($rootScope, $location, $resource) {
  function getToken(requestConfig) {
    return $rootScope.token;
  };

  var loginService = {};

  loginService.getUser = $resource('http://localhost:8080/auth/:userName', {}, {
    get: {
      method: 'GET',
      headers: {'Authorization': getToken}
    }
  });

  loginService.checkIfAuthenticated = function() {
    if($rootScope.user) {
      this.getUser.get({userName: $rootScope.user.userName}).$promise.then(function(response) {
        $rootScope.user = response;
        $location.path("/movieList");
      }, function(error) {
        $rootScope.user = null;
        $location.path("/login");
      })
    } else {
      $location.path("/login");
    }
  }

  return loginService;
}]);
