require([
    'angular',
    'app'
],
    function(angular, app){
       app.component('currentUser',{
               template: '<h3>Hello, {{ $ctrl.username }} !</h3>',
               controller: 'CurrentUserController'
           })
           .controller('CurrentUserController', [function($element, $attrs){
               //from localstorage
               this.username = 'Current user';
                console.log('component get current user');
           }]);


    });