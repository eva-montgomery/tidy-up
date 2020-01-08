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

app.get('/', (req, res) => {
    res.send('Hellooooo!');
});

app.get('/create', (req, res) => {
    console.log('yes, they did a GET request');
    res.render('form');
});

app.post('/create', parseForm, (req, res) => {
    console.log('Hooray a POST!');
    console.log(req.body);
    // reading the data fromt ge form
    res.redirect('/create/sucess');
});

app.get('/create/sucess', (req, res) => {
    res.send('success!');
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
