angular.module('todoApp').controller('RegisterController', function($scope, $http, $location) {
    $scope.user = {};
    $scope.register = function() {
      $http.post('http://localhost:3000/api/register', $scope.user)
        .then(function(response) {
          $location.path('/login');
        })
        .catch(function(error) {
          $scope.errorMessage = error.data.message || "Registration failed";
        });
    };
  });