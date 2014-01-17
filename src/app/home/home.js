/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, $q, $timeout, USER ) {
  console.log('HomeCtrl');

  var data = USER.getUsers();

  var rows = [];
  data.then(function(result){

    angular.forEach(result.users, function(value, key){
      var row = {
        items:[]
      };
      row.items.push({
        content:value.id
      });
      row.items.push({
        content:value.username
      });
      row.items.push({
        content:value.firstname
      });
      row.items.push({
        content:value.lastname
      });
      row.items.push({
        content:value.status
      }); 

      rows.push(row);

    });
  });

  $scope.myTable = {
    columns: [
        {
          title:'id'
        },
        {
          title:'username'
        },
        {
          title:'first name'
        },
        {
          title:'last name'
        },
        {
          title:'status'
        }                 
      ],

      rows: rows,

    cog:"true",
    checkbox:"true",
    status:""
    };


    console.log($scope.myTable);
})
;
