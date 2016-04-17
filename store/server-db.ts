import * as PouchDB from 'pouchdb';

let db = new PouchDB('users'); 

// Database GET
function get(req, res, configureStore, callback) {
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
function create(req, res, configureStore, callback) {
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
function update(req, res, configureStore, callback) {
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
function massUpdate(req, res, configureStore, callback) {

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
export default {
	get,
	create,
	update,
	massUpdate
}
