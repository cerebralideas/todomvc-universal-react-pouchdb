import reducer from './todos';
import { addTodo, deleteTodo, editTodo, completeTodo } from '../actions';
//@ts-ignore
test('Add a todo', function(): void {
	let result = reducer([], addTodo('New Todo!')),
		{ title, completed, id, editing } = result[0];
	//@ts-ignore
	expect(title).toBe('New Todo!');
	expect(completed).toBe(false);
	expect(id).toBe(0);
	expect(editing).toBe(false);
});
test('Delete a todo', function(): void {
	let todo1 = {
			id: 0,
			title: 'An existing todo',
			completed: false,
			editing: false
		},
		todo2 = {
			id: 1,
			title: 'Another existing todo',
			completed: false,
			editing: false
		},
		result = reducer([todo1, todo2], deleteTodo(0)),
		{ title } = result[0];

	expect(title).toBe('Another existing todo');
});
test('Edit a todo', function(): void {
	let todo1 = {
			id: 0,
			title: 'An existing todo',
			completed: false,
			editing: false
		},
		todo2 = {
			id: 1,
			title: 'Another existing todo',
			completed: false,
			editing: false
		},
		result = reducer([todo1, todo2], editTodo(1, 'A new title')),
		{ title } = result[1];

	expect(title).toBe('A new title');
});
test('Complete a todo', function(): void {
	let todo1 = {
			id: 0,
			title: 'An existing todo',
			completed: false,
			editing: false
		},
		todo2 = {
			id: 1,
			title: 'Another existing todo',
			completed: false,
			editing: false
		},
		result = reducer([todo1, todo2], completeTodo(1)),
		{ completed } = result[1];

	expect(completed).toBe(true);
});
