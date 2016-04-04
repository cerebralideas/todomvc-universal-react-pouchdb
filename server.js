'use strict';
var PORT = 3000;
var path_1 = require('path');
var express = require('express');
var ReactEngine = require('react-engine');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var PouchDB = require('pouchdb');
var configureStore_1 = require('./store/configureStore');
var app = express();
var db = new PouchDB('users');
require('babel-register')({
    presets: ['es2015', 'react']
});
var engine = ReactEngine.server.create({
    routesFilePath: path_1.join(__dirname, '/public/routes.jsx'),
    performanceCollector: function (stats) { }
});
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine('.js', engine);
app.set('views', path_1.join(__dirname, '/components'));
app.set('view engine', 'js');
app.set('view', ReactEngine.expressView);
app.use(express.static(path_1.join(__dirname, '/')));
function dbGet(req, res, configureStore, callback) {
    var filter = req.params.filter && req.params.filter.toUpperCase() || 'SHOW_ALL';
    db.get(req.ip, function (err, doc) {
        if (doc === void 0) { doc = {}; }
        var store = configureStore(doc.store), model;
        store.dispatch({ type: filter });
        model = {
            _id: req.ip,
            store: store.getState()
        };
        if (doc._rev) {
            model._rev = doc._rev;
        }
        db.put(model, function (err, doc) {
            callback(req, res, model.store);
        });
    });
}
function dbPut(req, res, store, callback) {
    var filter = req.query.filter && req.query.filter.toUpperCase() || 'SHOW_ALL';
    db.get(req.ip, function (err, doc) {
        var store = configureStore_1.default(doc.store);
        store.dispatch({ type: filter });
        store.dispatch({ type: 'ADD_TODO', text: req.body.todo });
        var model = {
            _id: doc._id,
            _rev: doc._rev,
            store: store.getState()
        };
        db.put(model, function (err, doc) {
            console.log(model.store);
            callback(req, res, model.store);
        });
    });
}
app.get('/', function (req, res) {
    dbGet(req, res, configureStore_1.default, function (req, res, model) {
        res.render('Layout', model);
    });
});
app.get('/:filter', function (req, res) {
    dbGet(req, res, configureStore_1.default, function (req, res, model) {
        res.render('Layout', model);
    });
});
app.post('/todos', function (req, res) {
    dbPut(req, res, configureStore_1.default, function (req, res, model) {
        res.redirect('/' + req.query.filter);
    });
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