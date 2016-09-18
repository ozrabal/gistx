//TODO rewrite!!
require(['angular', 'app', 'services/localstorage.service', 'services/session.service'], function(angular) {
    angular.module('app')
        .factory('AuthInterceptor', [ '$q', '$location', '$injector', 'session', function($q, $location, $injector, session){
            return {
                'request': function (config) {
                    config.headers = config.headers || {};

                    if (localStorage.getItem('session.accessToken') ) {
                        config.headers.Authorization = 'token ' + localStorage.getItem('session.accessToken');
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        session.destroy();
                        var stateService = $injector.get('$state');
                        stateService.go('root.home');
                    }
                }
            };
        }]);
});