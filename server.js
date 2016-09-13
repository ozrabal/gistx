var express = require('express');
var request = require('request');
var app = express();

app.use('/vendor',              express.static('vendor'));
app.use('/bower_components',    express.static('bower_components'));
app.use('/assets',              express.static('assets'));
app.use('/app',                 express.static('app'));
app.use('/views',               express.static('views'));

app.all('/*', function(req, res) {
    res.sendFile('app/index.html', { root: __dirname });
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});