require([
    'angular',
    'app',
    'services/session.service',
        'services/gist.service',
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
           }])
           .component('gistFile', {
               template: '<h4>{{$ctrl.title}}</h4>Tagged by: lorem ipsum' ,
               controller: 'GistFileController',
               bindings: {
                   id: '=',
                   description: '<'
               }
           })
           .controller('GistFileController',['$element', '$attrs','gist', function($element, $attrs, gist) {

               var iframe = document.createElement('iframe');
               iframe.setAttribute('width', '100%');
               iframe.setAttribute('frameborder', '0');
               iframe.id = "gist-" + this.id;
               $element[0].appendChild(iframe);

               var iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + this.id + '.js"></sc'+'ript></body></html>';

               this.doc = iframe.document;
               if (iframe.contentDocument) this.doc = iframe.contentDocument;
               else if (iframe.contentWindow) this.doc = iframe.contentWindow.document;

               this.doc.open();
               this.doc.writeln(iframeHtml);
               this.doc.close();

           }]);

    });