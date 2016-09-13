require.config({
    baseUrl: 'app/',
    paths: {
        'angular':      '../bower_components/angular/angular.min',
        'jquery':       '../bower_components/jquery/dist/jquery.min',
        'bootstrap':    '../bower_components/bootstrap/dist/js/bootstrap.min',
        'ngRoute':      '../bower_components/angular-route/angular-route.min',
        'ui.router':    '../bower_components/ui-router/release/angular-ui-router.min',
        'lodash':       '../bower_components/lodash/dist/lodash.min'
    },
    shim: {
        angular: {
            exports : 'angular',
            deps    : ['jquery']
        },
        bootstrap: {
            deps    : ['jquery']
        },
        'ui.router': {
            deps    : ['angular']
        },
        ngRoute :{
            deps: ['angular']
        }
    }
});
require([
    'app',
    'angular',
    'ngRoute',
    'jquery',
    'bootstrap',
    'ui.router',
    'lodash'
], function (app) {
    app.init();
});