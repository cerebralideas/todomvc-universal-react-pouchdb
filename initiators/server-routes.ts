import configureStore from '../store/configureStore';
import * as PouchDB from 'pouchdb';

let db = new PouchDB('users');

const init = function (app) {

	// Database GET
	function dbGet(req, res, configureStore, callback) {
		let filter = req.params.filter && req.params.filter.toUpperCase() || 'SHOW_ALL';

		db.get(req.ip, function (err: any, doc: any = {}) {
			let store = configureStore(doc.store),
				model;

			store.dispatch({ type: filter });

			model = {
				_id: req.ip,
				store: store.getState()
			};
			if (doc._rev) {
				model._rev = doc._rev;
			}
			db.put(model, function (err: any, doc: any) {
				callback(req, res, model.store);
			});
		});
	}
	// Database PUT
	function dbPutNew(req, res, configureStore, callback) {
		let filter = req.query.filter && req.query.filter.toUpperCase() || 'SHOW_ALL';

		db.get(req.ip, function (err: any, doc: any) {
			let store = configureStore(doc.store);
			store.dispatch({ type: filter });
			store.dispatch({ type: 'ADD_TODO', title: req.body.title });

			let model = {
				_id: doc._id,
				_rev: doc._rev,
				store: store.getState()
			};
			db.put(model, function (err: any, doc: any) {
				console.log(model.store);
				callback(req, res, model.store);
			});
		});
	}
	// Database PUT
	function dbUpdateTodo(req, res, configureStore, callback) {
		var actionQuery: any = { type: req.query.type, id: parseInt(req.params.id, 10) };

		if (req.query.type === 'EDIT_TODO') {
			actionQuery.title = req.body.title;
		}

		db.get(req.ip, function (err: any, doc: any) {
			let store = configureStore(doc.store);

			store.dispatch(actionQuery);

			let model = {
				_id: doc._id,
				_rev: doc._rev,
				store: store.getState()
			};
			db.put(model, function (err: any, doc: any) {
				callback(req, res, model.store);
			});
		});
	}
	// Database PUT
	function dbMassEdit(req, res, configureStore, callback) {

		db.get(req.ip, function (err: any, doc: any) {
			let store = configureStore(doc.store);
			store.dispatch({ type: req.query.type });

			let model = {
				_id: doc._id,
				_rev: doc._rev,
				store: store.getState()
			};
			db.put(model, function (err: any, doc: any) {
				console.log(model.store);
				callback(req, res, model.store);
			});
		});
	}

	// Routes
	app.get('/', function(req, res) {
		dbGet(req, res, configureStore, function (req, res, model) {
			res.render('Layout', model);
		});
	});
	app.get('/:filter', function(req, res) {
		dbGet(req, res, configureStore, function (req, res, model) {
			res.render('Layout', model);
		});
	});
	app.post('/todos', function(req, res) {
		dbPutNew(req, res, configureStore, function (req, res, model) {
			res.redirect('/' + req.query.filter);
		});
	});
	app.post('/api/todos', function(req, res) {
		dbPutNew(req, res, configureStore, function (req, res, model) {
			res.json(model);
		});
	});
	app.post('/api/todos/all', function(req, res) {
		dbMassEdit(req, res, configureStore, function (req, res, model) {
			res.json(model);
		});
	});
	app.post('/api/todos/:id', function(req, res) {
		dbUpdateTodo(req, res, configureStore, function (req, res, model) {
			res.json(model);
		});
	});
};

export default init;
