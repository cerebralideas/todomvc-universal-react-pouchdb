'use strict';
var PORT = 3000;
var path_1 = require('path');
var express = require('express');
var ReactEngine = require('react-engine');
var bodyParser = require('body-parser');
var multer = require('multer');
var configureStore_1 = require('./store/configureStore');
var app = express();
var store = configureStore_1.default();
require('babel-register')({
    presets: ['es2015', 'react']
});
var engine = ReactEngine.server.create({
    routesFilePath: path_1.join(__dirname, '/public/routes.jsx'),
    performanceCollector: function (stats) {
        console.log(stats);
    }
});
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.js', engine);
app.set('views', path_1.join(__dirname, '/components'));
app.set('view engine', 'js');
app.set('view', ReactEngine.expressView);
app.use(express.static(path_1.join(__dirname, '/')));
console.log(__dirname);
app.get('/', function (req, res) {
    store.dispatch({ type: 'SHOW_ALL' });
    res.render('Layout', store.getState());
});
app.get('/show_all', function (req, res) {
    store.dispatch({ type: 'SHOW_ALL' });
    res.render('Layout', store.getState());
});
app.get('/show_active', function (req, res) {
    store.dispatch({ type: 'SHOW_ACTIVE' });
    res.render('Layout', store.getState());
});
app.get('/show_completed', function (req, res) {
    store.dispatch({ type: 'SHOW_COMPLETED' });
    res.render('Layout', store.getState());
});
app.post('/todos', function (req, res) {
    console.log('####### req.body ', req.body);
    store.dispatch({ type: req.query.filter.toUpperCase() });
    store.dispatch({ type: 'ADD_TODO', text: req.body.todo });
    res.redirect('/' + req.query.filter);
});
app.use(function (err, req, res, next) {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
        return res.redirect(302, err.redirectLocation);
    }
    else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
        return res.status(404).send('Route Not Found!');
    }
    else {
        return res.status(500).send(err.message);
    }
});
var server = app.listen(PORT, function () {
    console.log('Example app listening at http://localhost:%s', PORT);
});
//# sourceMappingURL=server.js.map