"use strict";
var configureStore_1 = require('../store/configureStore');
var PouchDB = require('pouchdb');
var db = new PouchDB('users');
var init = function (app) {
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
    function dbPutNew(req, res, configureStore, callback) {
        var filter = req.query.filter && req.query.filter.toUpperCase() || 'SHOW_ALL';
        db.get(req.ip, function (err, doc) {
            var store = configureStore(doc.store);
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
    function dbPutComplete(req, res, configureStore, callback) {
        var filter = req.query.filter && req.query.filter.toUpperCase() || 'SHOW_ALL';
        db.get(req.ip, function (err, doc) {
            var store = configureStore(doc.store);
            store.dispatch({ type: 'COMPLETE_TODO', id: parseInt(req.params.id, 10) });
            console.log(req.params.id);
            var model = {
                _id: doc._id,
                _rev: doc._rev,
                store: store.getState()
            };
            db.put(model, function (err, doc) {
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
        dbPutNew(req, res, configureStore_1.default, function (req, res, model) {
            res.redirect('/' + req.query.filter);
        });
    });
    app.post('/api/todos', function (req, res) {
        dbPutNew(req, res, configureStore_1.default, function (req, res, model) {
            res.json(model);
        });
    });
    app.post('/api/todos/:id', function (req, res) {
        dbPutComplete(req, res, configureStore_1.default, function (req, res, model) {
            res.json(model);
        });
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
//# sourceMappingURL=server-routes.js.map