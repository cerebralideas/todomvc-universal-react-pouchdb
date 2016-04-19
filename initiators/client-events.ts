import * as superagent from 'superagent';
import * as actions from '../actions/index';
import { store } from '../store/redux-store';


/** *******************************
 * Client & Server Sync actions
 */
export function formSubmission(event, id) {
	let form = event.currentTarget.elements,
		title = form && form.todo.value ||
			event.currentTarget.value;

	event.preventDefault();

	// Was this an edit?
	if (id != null && title.length) {
		// Fire action on server
		superagent
			.post('/api/todos/' + id + '?type=EDIT_TODO')
			.send({ title: title })
			.end(function postCb(err, response) {
				// Fire action on client
				store.dispatch(actions.editTodo(id, title));
			});

	} else if (id != null && !title) {
		// If provided id, but title is empty delete item
		// Fire action on server
		superagent
			.post('/api/todos/' + id + '?type=DELETE_TODO')
			.end(function postCb(err, response) {
				// Fire action on client
				store.dispatch(actions.deleteTodo(id));
			});

	} else {
		// This was a new item
		// Fire action on server
		superagent
			.post('/api/todos')
			.send({ title: title })
			.end(function postCb(err, response) {
				// Fire action on client
				store.dispatch(actions.addTodo(title));
			});

		event.currentTarget.elements.todo.value = '';
	}
}
export function completeTodo(id) {
	// Fire action on server
	superagent
		.post('/api/todos/' + id + '?type=COMPLETE_TODO')
		.end(function postCb(err, response) {
			// Fire action on client
			store.dispatch(actions.completeTodo(id));
		});
}
export function completeAll() {
	// Fire action on server
	superagent
		.post('/api/todos/all?type=COMPLETE_ALL')
		.end(function postCb(err, response) {
			// Fire action on client
			store.dispatch(actions.completeAll());
		});
}
export function clearCompleted() {
	// Fire action on server
	superagent
		.post('/api/todos/all?type=CLEAR_COMPLETED')
		.end(function postCb(err, response) {
			// Fire action on client
			store.dispatch(actions.clearCompleted());
		});
}
export function deleteTodo(id) {
	// Fire action on server
	superagent
		.post('/api/todos/' + id + '?type=DELETE_TODO')
		.end(function postCb(err, response) {
			// Fire action on client
			store.dispatch(actions.deleteTodo(id));
		});
}


/** *******************************
 * Client side only action
 */
export function editingTodo(id) {
	store.dispatch(actions.editingTodo(id));
}
