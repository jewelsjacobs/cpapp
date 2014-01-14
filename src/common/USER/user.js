angular.module( 'ngBoilerplate.USER', [
  'ui.router',
  'ngBoilerplate.API'
])
.factory('USER', function($http, $q, API){
  var token = '';
  
  var service = {
    isToken:function(){
      return token;
    },
    isLoggedIn:function(){
      return token;
    },    
    getUsers: function(url){
      return API({
        url:'/users?size=100', 
        method:'GET'
      });
    },
    getUser: function(id) {
      return API({
        url:'/users/'+id, 
        method:'GET'
      });
    },
    getQuestions: function() {
      return API({
        url:'/questions', 
        method:'GET'
      });
    },    
    getToken: function(data) {
      console.log(data);
      var deferred = $q.defer();

      var getToken = API({
        url:'/tokens', 
        method:'POST', 
        data:data
      });
      
      getToken.then(function(response){
        token = response;
        deferred.resolve(response);
      });

      return deferred.promise;
    },
    createUser: function(data) {
      return API({
        url:'/users', 
        method:'POST', 
        data:data
      });
    },
    createSite: function(userId, tokenId, data) {
      return API({
        url:'/'+userId+'/sites',
        method:'POST',
        data:data,
        headers: {
          "X-Auth-Token":tokenId
        }
      });
    },
    getOwnedSites: function(userId, tokenId) {
      return API({
        url:'/'+userId+'/sites/owned',
        method:'GET',
        headers: {
          "X-Auth-Token":tokenId
        }
      });      
    }
  };

  return service;
})
;
