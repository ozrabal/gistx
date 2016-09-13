var express = require('express');
var request = require('request');
var app = express();

app.use('/vendor',              express.static('vendor'));
app.use('/bower_components',    express.static('bower_components'));
app.use('/assets',              express.static('assets'));
app.use('/app',                 express.static('app'));
app.use('/views',               express.static('views'));

app.get('/api/token/:code', function(req, res) {
    //call github api for token
    request.post({
        uri: 'https://github.com/login/oauth/access_token',
        form: {
            client_id:      '',
            client_secret:  '',
            code:           req.params.code
        },
        json: true
    }, function(err, httpResponse, body) {
        if (err) {
            res.send(500, { error: err });
            return;
        }
        res.send(body);
    });
});

app.all('/*', function(req, res) {
    res.sendFile('app/index.html', { root: __dirname });
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});