angular.module( 'ngBoilerplate.login', [
  'ui.router'
  ])

/**
* Each section or module of the site can also have its own routes. AngularJS
* will handle ensuring they are all available at run-time, but splitting it
* this way makes each module more "self-contained".
*/
.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: '' },
      //https://github.com/angular-ui/ui-router/wiki
      resolve: {

      }
  })
  .state( 'logout', {
    url: '/logout',
    views: {
      "main": {
        controller: function($scope, $state){
          //log user out then go to login
          $state.go('login');
        }
      }
    },
    data:{ pageTitle: '' },
      //https://github.com/angular-ui/ui-router/wiki
      resolve: {
        
      }
  });
})

.controller( 'LoginCtrl', function LoginController( $scope, $rootScope, userService, $state, $location ) {
  console.log('login');

  $scope.login = {};
  $scope.signup = {};

  $scope.doLogin = function(){

  };

  $rootScope.doLogout = function(){

  };

  $scope.doSignup = function(){

  };
})

;
