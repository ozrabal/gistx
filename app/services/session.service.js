//todo refactor
require(['angular', 'app', 'services/localstorage.service'], function(angular){
    angular.module('app')
    .factory('session',['localStorage', function(localStorage) {
        return {
            getAccessToken: function () {
                if (!localStorage.getItem('session.accessToken')) {
                    return false;
                }
                return localStorage.getItem('session.accessToken');
            },

            setAccessToken: function (token) {
                console.log('session token:' + token);
                localStorage.setItem('session.accessToken', token);
               
                return token;
            },
            setUser: function(user){
                localStorage.setItem('user', user.name);
            },
            getUser: function(){
              return localStorage.getItem('user');
            },
            destroy: function destroy() {
                setAccessToken(null);
            }
        }
    }])
});