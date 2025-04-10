angular.module('todoApp').config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/register', { templateUrl: 'views/register.html', controller: 'RegisterController' })
      .when('/login', { templateUrl: 'views/login.html', controller: 'LoginController' })
      .when('/home', { 
        templateUrl: 'views/home.html', 
        controller: 'HomeController',
        resolve: {
          auth: function($location) {
            if (!localStorage.getItem('token')) {
              $location.path('/login');
            }
          }
        }
      })
      .otherwise({ redirectTo: '/login' });
  });