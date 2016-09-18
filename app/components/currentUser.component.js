require([
    'angular',
    'app',
        'services/session.service'
],
    function(angular, app, session){
       app.component('currentUser',{
               template: '<h3>Hello, {{ $ctrl.username }} !</h3>',
               controller: 'CurrentUserController'
           })
           .controller('CurrentUserController', ['session',function(session, $element, $attrs){
               //from localstorage
               this.username = session.getUser();
               //console.log(session.getUser());
                console.log('component get current user');
           }]);


    });