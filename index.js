const http = require('http');
const express = require('express');
const app = express();

const PORT = 3000;
const server = http.createServer(app);

const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);

const helmet = require('helmet');
app.use(helmet());

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express.static('public'));

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const {
    stuff,
    users
} = require('./models');

// the equivalent^:
// const models = require('/models');
// const stuff = models.stuff;

app.get('/signup', (req, res) => {
    res.render('user-auth');
});

app.post('/signup', parseForm, (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;
    users.create(username, password);
    res.redirect('/login');
});


app.get('/login', (req, res) => {
    res.render('user-auth');
});

app.post('/login', parseForm, (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const didLogin = users.login(username, password);
    console.log(didLogin);
});

app.get('/', (req, res) => {
    console.log(stuff.all());
    res.send('Hellooooo!');
});

app.get('/create', (req, res) => {
    console.log(stuff.all());
    //console.log('yes, they did a GET request');
    res.render('form');
});

app.post('/create', parseForm, (req, res) => {
    console.log('Hooray a POST!');
    console.log(req.body);
    const {name, givesJoy} = req.body;
    stuff.create(name, givesJoy);
    // reading the data fromt ge form
    res.redirect('/create/sucess');
});

app.get('/create/sucess', (req, res) => {
    console.log(stuff.all());
    res.send('success!');
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
