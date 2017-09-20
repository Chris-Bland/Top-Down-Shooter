var express = require('express');
var application = express();
var server = require('http').Server(application);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use('/client', express.static(__dirname + '/client'));

application.get('/',function(request, response){
    response.sendFile(__dirname+'/index.html');
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

// io.sockets.on('conection', function(socket){
//     socket.on('save', save(data));
//
//     socket.emit('load', load());
//
// });
//
// function save(data) {
//
// };
//
// function load() {
//     //return mongoose call to the user db for the gameSave object
// };