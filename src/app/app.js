angular.module( 'ngBoilerplate', [
	'templates-app',
	'templates-common',
	'ngBoilerplate.login',
	'ngBoilerplate.home',
	'ngBoilerplate.about',
	'ui.router',
	'ngResource',
	'ngAnimate'
	])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise( '/home' );
})

.run( function($rootScope,   $state,   $stateParams) {
	console.log('running app...');
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $state ) {
	console.log('AppCtrl');
	
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if ( angular.isDefined( toState.data.pageTitle ) ) {
			$scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
		}
	});
	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		//check to see if user is logged in on route change start
	});

})

;

