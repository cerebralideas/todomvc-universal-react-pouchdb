import PouchDB from 'pouchdb';
import { Observable } from 'rxjs';

let db = new PouchDB('users');

// Database GET
export function get$(): Observable<any> {
	let userId = '1';

	return new Observable((observer): void => {
		db.get(userId).
			then((doc: any = {}): void => {
				observer.next(doc);
			}).catch((): void => {
				db.put({
					_id: userId,
					todos: []
				}).
					then((): void => {
						observer.next();
						observer.complete();
					}).
					catch((err): void => observer.error(err));
			})
	});
}
// Database PUT
export function put$(todos, doc): Observable<any> {

	return new Observable((observer): void => {

		db.put({
			_id: doc._id,
			_rev: doc._rev,
			todos
		}).
			then((): void => {
				observer.next();
				observer.complete();
			}).
			catch((err): void => observer.error(err));
	});
}
