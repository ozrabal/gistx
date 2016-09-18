require([
    'angular'

], function (angular) {
   angular.module('app')
       .service('gist',['$http', '$q', function($http, $q){
           
           return{
                getGists: function () {
                    var deferred = $q.defer();
                    return $http({
                        url: 'https://api.github.com/gists',
                        method: 'GET'
                    })
                        .then(function (result) {
                            deferred.resolve(result.data);
                            return deferred.promise;
                        });

                },
               getGist: function(id){
                   var deferred = $q.defer();
                   return $http({
                       url: 'https://api.github.com/gists/' + id,
                       method: 'GET'
                   })
                       .then(function (result) {
                           deferred.resolve(result.data);
                           return deferred.promise;
                       });
               }

           }
       }])
});
