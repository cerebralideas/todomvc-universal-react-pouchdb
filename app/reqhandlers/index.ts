import { map } from 'rxjs/operators';
import { createStore  } from 'redux';
import rootReducer from '../reducers/index';
import { get$ } from '../store/server-db';

export function get(req, res) {
	get$(req, res).pipe(
		map((doc: any) => {
			let filter = req.params.filter && req.params.filter || 'show_all',
				store = createStore(
					rootReducer,
					{
						filter: filter,
						todos: doc.todos
					}
				);

			let model = store.getState();
			return model;
		})
	).subscribe(
		(model: any) => res.render('server-layout', model),
		(err: any) => console.log(err)
	);
}
