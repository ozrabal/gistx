define('app',[
    'angular',
    'services/auth.service',
    'services/session.service',
    'services/authinterceptor.service'
],
function (angular) {
    var app = angular.module('app',[
            'ngRoute',
            'ui.router'
    ])
    .constant('API', {
        'GITHUB_AUTH_URL': 'https://github.com/login/oauth/authorize?scope=user:email gist&client_id=',
        'CLIENT_ID': ''
    })
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider ) {
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    'tags': {
                        templateUrl: 'app/views/tags.html'
                    },
                    'list': {
                        templateUrl: 'app/views/list.html'
                    },
                    'content': {
                        templateUrl: 'app/views/content.html'
                    }
                }
            })
            .state('root.home', {
                url: '/',
                views: {
                    'categories': {
                        templateUrl: 'app/views/categories.html'
                    },
                    'items': {
                        controller: 'HomeController as home',
                        templateUrl: 'app/views/items.html'
                    }
                }
            })
            .state('root.login',{
                url: '/login',
                views: {
                    'items': {
                        controller: 'LoginController as login'
                    }
                }
            })
        ;
        $urlRouterProvider.otherwise('/');
        $httpProvider.interceptors.push('AuthInterceptor');
    }])
    //check if user is authenticated
    .run(checkAccessOnStateChange)

    .controller('HomeController', function(){
        console.log('Home Ctrl');

    })
    .controller('LoginController',['auth', '$state', '$location', 'API', 'session', function(auth, $state, $location, API, session){
        var code = $location.search().code;
        if(code){
            //exchange code to access token
            auth.getToken(code).then( function(token) {
                //todo store in cookie
                //todo move to auth service
                session.setAccessToken(token.access_token);
                console.log('ok logged in');
                $state.go('root.home');
            });
        }else{
            //request 'code' from GitHub
            window.location = API.GITHUB_AUTH_URL + API.CLIENT_ID;
        }
    }])
    ;

    function checkAccessOnStateChange($rootScope, auth, $state){
        $rootScope.$on('$stateChangeStart', function(e, toState){
            console.log(toState.name);
            if(toState.name === "root.login"){
                return;
            }
            if(auth.isLoggedIn()){
                console.log('logged in');
                return;
            }
            e.preventDefault();
            $state.go('root.login');
        });
    }
    checkAccessOnStateChange.$inject = ['$rootScope', 'auth', '$state'];

    app.init = function () {
        angular.bootstrap(document, ['app']);
    };
    return app;
});