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

const { stuff } = require('./models');

// the equivalent^:
// const models = require('/models');
// const stuff = models.stuff;


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
