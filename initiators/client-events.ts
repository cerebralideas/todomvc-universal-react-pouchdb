import * as superagent from 'superagent';
import * as actions from '../actions/index';

let store: any;

export function initStore(initStore?: any) {
	if (!store) {
		store = initStore;
	}
}
export function formSubmission(event, id) {
	let form = event.currentTarget.elements,
		title = form && form.todo.value ||
			event.currentTarget.value;

	event.preventDefault();

	// Was this an edit?
	if (id != null && title.length) {
		// Fire action on client
		store.dispatch(actions.editTodo(id, title));
		// Fire action on server
		superagent
			.post('/api/todos/' + id + '?type=EDIT_TODO')
			.send({ title: title })
			.end(function postCb(err, response) {
				console.log(response);
			});

	} else if (id != null && !title) {
		// If provided id, but title is empty delete item
		// Fire action on client
		store.dispatch(actions.deleteTodo(id));
		// Fire action on server
		superagent
			.post('/api/todos/' + id + '?type=DELETE_TODO')
			.end(function postCb(err, response) {
				console.log(response);
			});

	} else {
		// This was a new item
		// Fire action on client
		store.dispatch(actions.addTodo(title));
		// Fire action on server
		superagent
			.post('/api/todos')
			.send({ title: title })
			.end(function postCb(err, response) {
				console.log(response);
			});

		event.currentTarget.elements.todo.value = '';
	}
}
export function completeTodo(id) {
	// Fire action on client
	store.dispatch(actions.completeTodo(id));
	// Fire action on server
	superagent
		.post('/api/todos/' + id + '?type=COMPLETE_TODO')
		.end(function postCb(err, response) {
			console.log(response);
		});
}
export function completeAll() {
	// Fire action on client
	store.dispatch(actions.completeAll());
	// Fire action on server
	superagent
		.post('/api/todos/all?type=COMPLETE_ALL')
		.end(function postCb(err, response) {
			console.log(response);
		});
}
export function clearCompleted() {
	// Fire action on client
	store.dispatch(actions.clearCompleted());
	// Fire action on server
	superagent
		.post('/api/todos/all?type=CLEAR_COMPLETED')
		.end(function postCb(err, response) {
			console.log(response);
		});
}
export function deleteTodo(id) {
	// Fire action on client
	store.dispatch(actions.deleteTodo(id));
	// Fire action on server
	superagent
		.post('/api/todos/' + id + '?type=DELETE_TODO')
		.end(function postCb(err, response) {
			console.log(response);
		});
}
// Client side only action
export function editingTodo(id) {
	store.dispatch(actions.editingTodo(id));
}
