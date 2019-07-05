import PouchDB from 'pouchdb';
import { Observable } from 'rxjs';

let db = new PouchDB('users');

function getDoc$(userId: string) {

	return new Observable((observer) => {
		db.get(userId).
			then((doc: any = {}) => {
				observer.next(doc);
			}).catch((err: any) => {

				let model = {
					_id: userId,
					todos: []
				};
				db.put(model).
					then(() => {
						observer.next();
						observer.complete();
					}).
					catch((err) => observer.error(err));
			})
	});
}
// Database GET
export function get$(req, res) {
	let userId = '1';

	return getDoc$(userId);
}
// Database PUT
export function create$(req, res, store, doc) {

	return new Observable((observer) => {

		let model = {
			_id: doc._id,
			_rev: doc._rev,
			todos: store.getState().todos
		};
		db.put(model).
			then(() => {
				observer.next();
				observer.complete();
			}).
			catch((err) => observer.error(err));
		});
}
// Database PUT
export function update$(req, res, store, doc) {

	return new Observable((observer) => {

		let model = {
			_id: doc._id,
			_rev: doc._rev,
			todos: store.getState().todos
		};
		db.put(model).
			then(() => {
				observer.next();
				observer.complete();
			}).
			catch((err) => observer.error(err));
	});
}
// Database PUT
export function massUpdate$(req, res, store, doc) {

	return new Observable((observer) => {

		let model = {
			_id: doc._id,
			_rev: doc._rev,
			todos: store.getState().todos
		};
		db.put(model).
			then(() => {
				observer.next();
				observer.complete();
			}).
			catch((err) => observer.error(err));
	});
}
