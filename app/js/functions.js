var getImdbMovie = function($http, imdbID) {
  return $http({
    method: 'GET',
    url: 'http://www.omdbapi.com/?i='+imdbID
  })
};

var getPerson = function(firstName, lastName) {
  PersonsFinder.get({firstName: firstName, lastName: lastName}, function(person) {
    $scope.foundPerson = person;
  });
}
