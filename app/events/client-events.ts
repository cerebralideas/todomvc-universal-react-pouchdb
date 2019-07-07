import superagent from 'superagent';
import * as actions from '../actions';
import { store } from '../store/redux-store';

/** *******************************
 * Client & Server Sync actions
 */
export function formSubmission(event, id): void {
	let title =
		event.currentTarget.id === 'todoForm'
			? event.currentTarget.elements.todoInput.value
			: event.currentTarget.value;

	event.preventDefault();

	// Was this an edit?
	if (id && title.length) {
		// Fire action on server
		superagent
			.post('/api/todos/' + id + '?type=EDIT_TODO')
			.send({ title: title })
			.end((): void => {
				// Fire action on client
				store.dispatch(actions.editTodo(id, title));
			});
	} else if (id && !title) {
		// If provided id, but title is empty delete item
		// Fire action on server
		superagent.post('/api/todos/' + id + '?type=DELETE_TODO').end((): void => {
			// Fire action on client
			store.dispatch(actions.deleteTodo(id));
		});
	} else {
		// This was a new item
		// Fire action on server
		superagent
			.post('/api/todos')
			.send({ title: title })
			.end((): void => {
				// Fire action on client
				store.dispatch(actions.addTodo(title));
			});

		event.currentTarget.elements.todoInput.value = '';
	}
}
export function completeTodo(id): void {
	// Fire action on server
	superagent.post('/api/todos/' + id + '?type=COMPLETE_TODO').end((): void => {
		// Fire action on client
		store.dispatch(actions.completeTodo(id));
	});
}
export function completeAll(): void {
	// Fire action on server
	superagent.post('/api/todos/all?type=COMPLETE_ALL').end((): void => {
		// Fire action on client
		store.dispatch(actions.completeAll());
	});
}
export function clearCompleted(): void {
	// Fire action on server
	superagent.post('/api/todos/all?type=CLEAR_COMPLETED').end((): void => {
		// Fire action on client
		store.dispatch(actions.clearCompleted());
	});
}
export function deleteTodo(id): void {
	// Fire action on server
	superagent.post('/api/todos/' + id + '?type=DELETE_TODO').end((): void => {
		// Fire action on client
		store.dispatch(actions.deleteTodo(id));
	});
}

/** *******************************
 * Client side only action
 */
export function editingTodo(id): void {
	store.dispatch(actions.editingTodo(id));
}
