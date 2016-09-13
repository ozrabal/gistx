define('app',[
    'angular',
],
function (angular) {
    var app = angular.module('app',[
            'ngRoute',
            'ui.router'
    ])
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
        ;
        $urlRouterProvider.otherwise('/');
    }])
    .controller('HomeController', function(){
        console.log('Home Ctrl');
    })
    app.init = function () {
        angular.bootstrap(document, ['app']);
    };
    return app;
});