import { mergeMap } from 'rxjs/operators';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { get$, put$ } from '../store/db.server';
import { editTodo, addTodo, completeTodo, deleteTodo, completeAll, clearCompleted } from '../actions';
import { Observable } from 'rxjs';

export function create(req, res): void {
	get$()
		.pipe(
			mergeMap(
				(doc): Observable<void> => {
					let filter = (req.param.query && req.param.query) || 'show_all',
						store = createStore(rootReducer, {
							filter,
							todos: doc.todos
						});

					store.dispatch(addTodo(req.body.title));

					return put$(store.getState().todos, doc);
				}
			)
		)
		.subscribe(
			(): void => {
				if (req.path.includes('api')) {
					res.send('success');
				} else if (req.query.filter) {
					res.redirect('/' + req.query.filter);
				} else {
					res.redirect('/');
				}
			},
			(err: any): void => console.log(err)
		);
}
export function update(req, res): void {
	get$()
		.pipe(
			mergeMap(
				(doc): Observable<void> => {
					let todoId = parseInt(req.params.id, 10),
						todoTitle = req.body.title,
						store = createStore(rootReducer, {
							todos: doc.todos
						});

					if (req.query.type === 'EDIT_TODO') {
						store.dispatch(editTodo(todoId, todoTitle));
					} else if (req.query.type === 'COMPLETE_TODO') {
						store.dispatch(completeTodo(todoId));
					} else {
						store.dispatch(deleteTodo(todoId));
					}

					return put$(store.getState().todos, doc);
				}
			)
		)
		.subscribe(
			(): void => {
				if (req.path.includes('api')) {
					res.send('success');
				} else {
					res.redirect('/' + req.query.filter);
				}
			},
			(err: any): void => console.log(err)
		);
}
export function massUpdate(req, res): void {
	get$()
		.pipe(
			mergeMap(
				(doc): Observable<void> => {
					let store = createStore(rootReducer, {
						todos: doc.todos
					});

					if (req.query.type === 'COMPLETE_ALL') {
						store.dispatch(completeAll());
					} else {
						store.dispatch(clearCompleted());
					}

					return put$(store.getState().todos, doc);
				}
			)
		)
		.subscribe(
			(): void => {
				if (req.path.includes('api')) {
					res.send('success');
				} else {
					res.redirect('/' + req.query.filter);
				}
			},
			(err: any): void => console.log(err)
		);
}
