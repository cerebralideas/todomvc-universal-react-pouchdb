import { configureStore  } from '../store/redux-store';
import db from '../store/server-db';

export function create(req, res) {
	db.create$(req, res, configureStore).subscribe(
		(data) => {
			if (req.path.includes('api')) {
				res.json(data);
			} else {
				res.redirect('/' + req.query.filter);
			}
		}
	);
}
export function update(req, res) {
	db.update$(req, res, configureStore).subscribe(
		(data) => res.json(data)
	);
}
export function massUpdate(req, res) {
	db.massUpdate$(req, res, configureStore).subscribe(
		(data) => res.json(data)
	);
}
