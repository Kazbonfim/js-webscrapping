var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const scrapRouter = require('./routes/scrapp');
const pokemonRouter = require('./routes/scrapp-pokemon');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'src')));

app.use('/', indexRouter);
app.use('/', scrapRouter);
app.use('/', pokemonRouter);

module.exports = app;