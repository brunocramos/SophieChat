'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$location',
  function ($scope, Authentication, $location) {
    // This provides Authentication context.
    $scope.authentication = Authentication;


    $scope.checkAuthentication = function() {
    	if (Authentication.user) {
    	  $location.path('/chat');
    	}
    };

    $scope.isAuthenticated = function() {
    	return Authentication.user;
    };
  }
]);
