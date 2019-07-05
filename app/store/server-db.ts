import PouchDB from 'pouchdb';
import { Observable } from 'rxjs';

let db = new PouchDB('users');

// Database GET
export function get$(req, res) {
	let userId = '1';

	return new Observable((observer) => {
		db.get(userId).
			then((doc: any = {}) => {
				observer.next(doc);
			}).catch((err: any) => {
				db.put({
						_id: userId,
						todos: []
					}).
					then(() => {
						observer.next();
						observer.complete();
					}).
					catch((err) => observer.error(err));
			})
	});
}
// Database PUT
export function put$(req, res, store, doc) {

	return new Observable((observer) => {

		db.put({
				_id: doc._id,
				_rev: doc._rev,
				todos: store.getState().todos
			}).
			then(() => {
				observer.next();
				observer.complete();
			}).
			catch((err) => observer.error(err));
		});
}
