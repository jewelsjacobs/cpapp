angular.module( 'ngBoilerplate.API', [
  'ui.router'
])
.config(function config( ) {
  
})
.factory('API', function($http, $q){
  var service = function(req) {
      var proxy ='http://localhost:4000/v0.9';
      var deffered = $q.defer();
      
      var options = {
        method: req.method, 
        url: proxy+req.url,
        data:req.data,
        headers:req.headers
      };

      $http(options).success(function(data, status, headers, config) {
        // console.log(status);
        // console.log(data);
        deffered.resolve(data);
      })
      .error(function(data, status, headers, config) {
        // console.log(status);
        // console.log(data);
        deffered.resolve(data);
      });

      return deffered.promise;
  };

  return service;
})
;
