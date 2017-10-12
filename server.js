var express = require('express');
var application = express();
var server = require('http').Server(application);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const session = require('express-session');
// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// const Users = require("./models/Users");

// mongoose.connect('mongodb://localhost:27017/Shooterbase');
// mongoose.connection
//     .once('open', () => console.log('good to go'))
//     .on('error', (error) => {
//         console.warn('Warning', error);
//     });


application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use('/client', express.static(__dirname + '/client'));

application.use(bodyParser());
application.use(bodyParser.urlencoded({ extended: true }));

application.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


application.get('/',function(request, response){
    // if(session.isAuthenticated){
        response.sendFile(__dirname+'/index.html');
    // }
    // else{
    //     response.redirect('login');
    // }
});

application.get('/login', (request, response) => {
    response.render('login');
});

application.post('/login', async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    let errors = [];

    if(await Users.findOne({username: username}) == null){
        errors.push('This username is not valid');
        response.render('login', {errors: errors});
    }
    else{
        session.user = await Users.findOne({username: username});

        if(session.user.password == password){
            session.isAuthenticated = true;
            response.redirect('/');
        }
        else{
            errors.push('This password does not match username provided');
            session.user = {};
            response.render('login', {errors: errors});
        }
    }

});

application.get('/signup', (request, response) => {
    response.render('signup');
});

application.post('/signup', async (request, response) => {
    let username = request.body.username;
    let display = request.body.display;
    let password = request.body.password;
    let confirm = request.body.confirm;
    let errors = [];

    if(await Users.findOne({username: username}) != null){
        errors.push('This username is taken');
    }
    if(await Users.findOne({display: display}) != null){
        errors.push('This display name is taken');
    }
    if(password != confirm) {
        errors.push('The passwords do not match');
    }

    if(errors.length == 0){
        Users.create({
            username: username,
            password: password,
            display: display,
            topWave: 0,
            game: {
                towers: [0],
                mercs: 0,
                wave: 0,
                lvl: 1,
                XP: 1,
                weapons: [0],
                money: 0
            }
        })
            .then(() => {
                response.redirect('login')
            })
            .catch(() => {
                console.log("It aint be creating");
            });

    }
    else{
        response.render('signup', {errors: errors});
    }


});

server.listen(9000,function(){ 
    console.log('Listening on '+server.address().port);
});



