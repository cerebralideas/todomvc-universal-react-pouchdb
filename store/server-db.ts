import * as PouchDB from 'pouchdb';

let db = new PouchDB('users');

// Database GET
function get(req, res, configureStore, callback) {
	let filter = req.params.filter && req.params.filter.toUpperCase() || 'SHOW_ALL',
		userId = '1';

	db.get(userId).
		then(function (doc: any = {}) {
			let store = configureStore(doc.store),
				model;

			store.dispatch({ type: filter });

			model = {
				_id: userId,
				store: store.getState()
			};
			if (doc._rev) {
				model._rev = doc._rev;
			}
			db.put(model).
				then(function (doc: any) {
					callback(req, res, model.store);
				}).
				catch(function (err: any) {
					console.error(err);
				});
		}).
		catch(function (err: any) {
			let store = configureStore({}),
				model;

			store.dispatch({ type: filter });

			model = {
				_id: userId,
				store: store.getState()
			};
			db.put(model).
				then(function (doc: any) {
					callback(req, res, model.store);
				}).
				catch(function (err: any) {
					console.error(err);
				});
		});
}
// Database PUT
function create(req, res, configureStore, callback) {
	let filter = req.param.query && req.param.query.toUpperCase() || 'SHOW_ALL',
		userId = '1';

	db.get(userId).
		then(function (doc: any) {
			let store = configureStore(doc.store);
			store.dispatch({ type: filter });
			store.dispatch({ type: 'ADD_TODO', title: req.body.title });

			let model = {
				_id: doc._id,
				_rev: doc._rev,
				store: store.getState()
			};
			db.put(model).
				then(function (doc: any) {
					console.log(model.store);
					callback(req, res, model.store);
				}).
				catch(function (err: any) {
					console.error(err);
				});
		}).
		catch(function (err: any) {
			console.error(err);
		});
}
// Database PUT
function update(req, res, configureStore, callback) {
	let actionQuery: any = { type: req.query.type, id: parseInt(req.params.id, 10) },
		userId = '1';

	if (req.query.type === 'EDIT_TODO') {
		actionQuery.title = req.body.title;
	}

	db.get(userId).
		then(function (doc: any) {
			let store = configureStore(doc.store);

			store.dispatch(actionQuery);

			let model = {
				_id: doc._id,
				_rev: doc._rev,
				store: store.getState()
			};
			db.put(model).
				then(function (doc: any) {
					callback(req, res, model.store);
				}).
				catch(function (err: any) {
					console.error(err);
				});
		}).
		catch(function (err: any) {
			console.error(err);
		});
}
// Database PUT
function massUpdate(req, res, configureStore, callback) {
	let userId = '1';

	db.get(userId).
		then(function (doc: any) {
			let store = configureStore(doc.store);
			store.dispatch({ type: req.query.type });

			let model = {
				_id: doc._id,
				_rev: doc._rev,
				store: store.getState()
			};
			db.put(model).
				then(function (doc: any) {
					console.log(model.store);
					callback(req, res, model.store);
				}).
				catch(function (err: any) {
					console.error(err);
				});
		}).
		catch(function (err: any) {
			console.error(err);
		});
}
export default {
	get,
	create,
	update,
	massUpdate
}
