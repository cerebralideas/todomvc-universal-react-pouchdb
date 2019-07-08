import { map } from 'rxjs/operators';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { get$ } from '../store/db.server';
import { State } from '../interfaces';

export function get(req, res): void {
	get$()
		.pipe(
			map(
				(doc): State => {
					let filter = (req.params.filter && req.params.filter) || 'show_all',
						store = createStore(rootReducer, {
							filter: filter,
							todos: (doc && doc.todos) || []
						});

					let model = store.getState();
					return model;
				}
			)
		)
		.subscribe((model): void => res.render('server-layout', model), (err: any): void => console.log(err));
}
