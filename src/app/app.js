angular.module( 'ngBoilerplate', [
	//angular resources
	'ui.router',
	'ngResource',
	'ngAnimate',
	//combined templates and common plugins
	'templates-app',
	'templates-common',
	//routes
	'ngBoilerplate.login',
	'ngBoilerplate.home',
	//Core Systems
	'ngBoilerplate.API',
	'ngBoilerplate.USER'
	])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise( '/login' );
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

