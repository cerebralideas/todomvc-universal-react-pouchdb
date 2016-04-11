import * as types from '../constants/ActionTypes'

export function addTodo(title) {
	return { type: types.ADD_TODO, title };
}

export function deleteTodo(id) {
	return { type: types.DELETE_TODO, id };
}

export function editingTodo(id) {
	return { type: types.EDITING_TODO, id };
}

export function editTodo(id, title) {
	return { type: types.EDIT_TODO, id, title };
}

export function completeTodo(id) {
	return { type: types.COMPLETE_TODO, id };
}

export function completeAll() {
	return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
	return { type: types.CLEAR_COMPLETED };
}

export function showAll() {
	return { type: types.SHOW_ALL };
}

export function showActive() {
	return { type: types.SHOW_ACTIVE };
}

export function showCompleted() {
	return { type: types.SHOW_COMPLETED };
}
