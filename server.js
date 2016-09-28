var express = require('express');
var favicon = require('serve-favicon');
var fs = require('fs');

var host = "127.0.0.1";
var port = "8080";

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.get('/', function (req, res) {
    res.sendfile(fileName);
});

app.listen(port, host, function() {
    console.log(`App is running on ${host}:${port}`);
});