import { configureStore  } from '../store/redux-store';
import db from '../store/server-db';

export function get(req, res) {
	db.get$(req, res, configureStore).subscribe(
		(data) => res.render('server-layout', data)
	);
}
