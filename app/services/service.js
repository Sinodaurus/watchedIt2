angular.module('watcher.service', [])
.factory('Authenticate', ['$resource', function($resource) {
  return $resource('http://localhost:8080/auth/:userName', {}, {
    get: {
      method: 'GET',
      headers: {'Authorization': getPassword()}
    }
  });
}])
.factory('Token', ['$resource', function($resource) {
  return $resource('http://localhost:8080/auth/getToken/:userName');
}])
.factory('Person', ['$resource', function($resource) {
  return $resource('http://localhost:8080/person/:id');
}])
.factory('Movie', ['$resource', function($resource) {
  return $resource('http://localhost:8080/movie/:id');
}])
.factory('PersonSeenMovie', ['$resource', function($resource) {
  return $resource('http://localhost:8080/person/:personId/:movieId', null, {
    'update': {method: 'PUT'}
  });
}])
.factory('PersonsFinder', ['$resource', function($resource) {
  return $resource('http://localhost:8080/person/:firstName/:lastName');
}]);
