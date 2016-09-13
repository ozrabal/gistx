require(['angular', 'app',  'services/session.service'], function(angular){
	angular.module('app')
	.factory('auth', ['$http', 'session', 'API', '$q', function($http, session, API, $q){
		return {
			isLoggedIn : function isLoggedIn() {
				console.log('stored token: ' + session.getAccessToken());
				return session.getAccessToken() !== false;
			},
			getToken : function (code) {
				console.log('get token, code: ' + code);
				var deferred = $q.defer();
				return $http({
					url: '/api/token/'+code,
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