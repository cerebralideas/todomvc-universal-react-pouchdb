import { map } from 'rxjs/operators';
import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { get$ } from '../store/server-db';
import { State } from '../interfaces';

export function get(req, res): void {
	get$()
		.pipe(
			map(
				(doc: any): State => {
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
		.subscribe((model: any): void => res.render('server-layout', model), (err: any): void => console.log(err));
}
