import PouchDB from 'pouchdb';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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
function getDoc$(userId: string, configureStore: any, filter?: string) {

	return new Observable((observer) => {
		db.get(userId).
			then((doc: any = {}) => {
				observer.next(doc);
			}).catch((err: any) => {
				let store = configureStore(),
					model;

				if (filter) { handleFilter(store, filter); }

				model = {
					_id: userId,
					store: store.getState()
				};
				db.put(model).
					then(function (doc: any) {
						observer.next(doc);
						observer.complete();
					}).
					catch(function (err: any) {
						observer.error(err);
					});
			})
	});
}
// Database GET
function get$(req, res, configureStore) {
	let filter = req.params.filter && req.params.filter.toUpperCase() || 'SHOW_ALL',
		userId = '1';

	return getDoc$(userId, configureStore, filter).pipe(
		map((doc: any = {}) => {
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
			return model.store;
		})
	);
}
// Database PUT
function create$(req, res, configureStore) {
	let filter = req.param.query && req.param.query.toUpperCase() || 'SHOW_ALL',
		userId = '1';

	return getDoc$(userId, configureStore, filter).pipe(
		mergeMap((doc: any) => {
			return new Observable((observer) => {
				let store = configureStore(doc.store);

				handleFilter(store, filter);
				store.dispatch(addTodo(req.body.title));

				let model = {
					_id: doc._id,
					_rev: doc._rev,
					store: store.getState()
				};
				db.put(model).
					then((doc: any) => {
						observer.next(model.store);
						observer.complete();
					}).
					catch((err: any) => {
						observer.error(err);
					});
				});
		})
	);
}
// Database PUT
function update$(req, res, configureStore) {
	let todoId = parseInt(req.params.id, 10),
		todoTitle = req.body.title,
		userId = '1';

	return getDoc$(userId, configureStore).pipe(
		mergeMap((doc: any) => {
			return new Observable((observer) => {
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
					then((doc: any) => {
						observer.next(model.store);
					}).
					catch((err: any) => {
						observer.error(err);
					});
			});
		})
	);
}
// Database PUT
function massUpdate$(req, res, configureStore) {
	let userId = '1';

	return getDoc$(userId, configureStore).pipe(
		mergeMap((doc: any) => {
			return new Observable((observer) => {
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
					then((doc: any) => {
						observer.next(model.store);
					}).
					catch((err: any) => {
						observer.error(err);
					});
			});
		})
	);
}
export default {
	get$,
	create$,
	update$,
	massUpdate$
}
