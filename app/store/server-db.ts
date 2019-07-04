import PouchDB from 'pouchdb';
import {
	editTodo,
	addTodo,
	completeTodo,
	deleteTodo,
	showAll,
	showActive,
	showCompleted,
	completeAll,
	clearCompleted
} from '../actions/index';

let db = new PouchDB('users');

function handleFilter(store, filter) {
	if (filter === 'SHOW_COMPLETED') {
		store.dispatch(showCompleted());
	} else if (filter === 'SHOW_ACTIVE') {
		store.dispatch(showActive());
	} else {
		store.dispatch(showAll());
	}
}
// Database GET
function get(req, res, configureStore, callback) {
	let filter = req.params.filter && req.params.filter.toUpperCase() || 'SHOW_ALL',
		userId = '1';

	db.get(userId).
		then(function (doc: any = {}) {
			let store = configureStore(doc.store),
				model;

			handleFilter(store, filter);

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

			handleFilter(store, filter);

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

			handleFilter(store, filter);
			store.dispatch(addTodo(req.body.title));

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
	let action,
		todoId = parseInt(req.params.id, 10),
		todoTitle = req.body.title,
		userId = '1';

	db.get(userId).
		then(function (doc: any) {
			let store = configureStore(doc.store);

			if (req.query.type === 'EDIT_TODO') {
				store.dispatch(editTodo(todoId, todoTitle));
			} else if (req.query.type === 'COMPLETE_TODO'){
				store.dispatch(completeTodo(todoId));
			} else {
				store.dispatch(deleteTodo(todoId));
			}

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

			if (req.query.type === 'COMPLETE_ALL') {
				store.dispatch(completeAll());
			} else {
				store.dispatch(clearCompleted());
			}

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
