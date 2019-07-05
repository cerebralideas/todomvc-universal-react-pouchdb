import { mergeMap } from 'rxjs/operators';
import { createStore  } from 'redux';
import rootReducer from '../reducers/index';
import { get$, put$ } from '../store/server-db';
import {
	editTodo,
	addTodo,
	completeTodo,
	deleteTodo,
	completeAll,
	clearCompleted
} from '../actions/index';

export function create(req, res) {
	get$(req, res, ).pipe(
		mergeMap((doc: any) => {
			let filter = req.param.query && req.param.query || 'show_all',
				store = createStore(
					rootReducer,
					{
						filter,
						todos: doc.todos
					}
				);

			store.dispatch(addTodo(req.body.title));

			return put$(req, res, store, doc);
		})
	).subscribe(
		() => {
			if (req.path.includes('api')) {
				res.send('success');
			} else if (req.query.filter) {
				res.redirect('/' + req.query.filter);
			} else {
				res.redirect('/');
			}
		},
		(err: any) => console.log(err)
	);
}
export function update(req, res) {
	get$(req, res, ).pipe(
		mergeMap((doc: any) => {

			let todoId = parseInt(req.params.id, 10),
				todoTitle = req.body.title,
				store = createStore(
					rootReducer,
					{
						todos: doc.todos
					})
				;

			if (req.query.type === 'EDIT_TODO') {
				store.dispatch(editTodo(todoId, todoTitle));
			} else if (req.query.type === 'COMPLETE_TODO'){
				store.dispatch(completeTodo(todoId));
			} else {
				store.dispatch(deleteTodo(todoId));
			}

			return put$(req, res, store, doc);
		})
	).subscribe(
		(data) => res.send('success'),
		(err: any) => console.log(err)
	);
}
export function massUpdate(req, res) {
	get$(req, res, ).pipe(
		mergeMap((doc: any) => {

			let store = createStore(
				rootReducer,
				{
					todos: doc.todos
				})
			;

			if (req.query.type === 'COMPLETE_ALL') {
				store.dispatch(completeAll());
			} else {
				store.dispatch(clearCompleted());
			}

			return put$(req, res, store, doc);
		})
	).subscribe(
		(data) => res.send('success'),
		(err: any) => console.log(err)
	);
}
