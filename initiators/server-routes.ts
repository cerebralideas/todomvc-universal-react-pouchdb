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
			store.dispatch({ type: 'ADD_TODO', text: req.body.todo });

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
	function dbPutComplete(req, res, configureStore, callback) {
		let filter = req.query.filter && req.query.filter.toUpperCase() || 'SHOW_ALL';

		db.get(req.ip, function (err: any, doc: any) {
			let store = configureStore(doc.store);

			store.dispatch({ type: 'COMPLETE_TODO', id: parseInt(req.params.id, 10) });
			console.log(req.params.id);

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
	app.post('/api/todos/:id', function(req, res) {
		dbPutComplete(req, res, configureStore, function (req, res, model) {
			res.json(model);
		});
	});
};

export default init;
