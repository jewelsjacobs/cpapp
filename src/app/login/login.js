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

.controller( 'LoginCtrl', function LoginController( $scope, $rootScope, $state, API, USER) {
  console.log('login');

  $scope.login = {};
  $scope.newSite = {};
  $scope.loggedIn = {};

  $scope.api = {
    getUsers: function() {
      USER.getUsers().then(function(results){
        $scope.users = results.users;
      });
    },
    getUser: function(id) {
      // var deferred = $q.defer();
      // USER.getUser(id).then(function(result){
      //   return deferred.resolve(result);
      // });
      return USER.getUser(id);
    },
    login:function() {
      var ths = this;

      USER.getToken($scope.login).then(function(result){
        $scope.loggedIn = {
          token:result
        };
        ths.getUser(result.userId).then(function(user){
          $scope.loggedIn.user = user;

          USER.getOwnedSites($scope.loggedIn.token.userId, $scope.loggedIn.token.id).then(function(results){
            $scope.mySites = results.sites;
          });
          console.log($scope.loggedIn);
        });
        
      });
    },
    signup:function() {
      USER.createUser($scope.login).then(function(result){
        console.log(result);
        // $scope.api.login();
      });
    },
    createSite:function() {
      console.log($scope.newSite);
      USER.createSite($scope.loggedIn.token.userId, $scope.loggedIn.token.id, $scope.newSite).then(function(result){
        USER.getOwnedSites($scope.loggedIn.token.userId, $scope.loggedIn.token.id).then(function(results){
            $scope.mySites = results.sites;
          });
        console.log(result);
      });
    }
  };
})

;
