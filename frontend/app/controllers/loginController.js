angular.module('todoApp').controller('LoginController', function($scope, $http, $location) {
    $scope.user = {};
    $scope.login = function() {
      $http.post('http://localhost:3000/api/login', $scope.user)
        .then(function(response) {
          localStorage.setItem('token', response.data.token);
          $location.path('/home');
        })
        .catch(function(error) {
          $scope.errorMessage = error.data.message || "Login failed";
        });
    };
  });