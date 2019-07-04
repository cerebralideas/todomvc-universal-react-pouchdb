import { handleActions } from 'redux-actions';
import {
	addTodo,
	deleteTodo,
	editingTodo,
	editTodo,
	completeTodo,
	completeAll,
	clearCompleted
} from '../actions/index';

import { Todo, Action } from '../interfaces/index';

export default handleActions(
	{
		[addTodo]: (state: Todo[], action: Action) => ([
			{
				id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
				completed: false,
				title: action.payload.title,
				editing: false
			},
			...state
		]),

		[deleteTodo]: (state: Todo[], action: Action) => {
			return state.filter(todo =>
				todo.id !== action.payload.id
			);
		},

		[editingTodo]: (state: Todo[], action: Action) => {
			return state.map(todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, { editing: true }) :
					todo
				);
		},

		[editTodo]: (state: Todo[], action: Action) => {
			return state.map(todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, { title: action.payload.title, editing: false }) :
					todo
				);
		},

		[completeTodo]: (state: Todo[], action: Action) => {
			return state.map(todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, {completed: !todo.completed}) :
					todo
				);
		},

		[completeAll]: (state: Todo[], action: Action) => {
			const areAllMarked = state.every(todo => todo.completed);
			return state.map(todo => Object.assign({}, todo, {
				completed: !areAllMarked
			}));
		},

		[clearCompleted]: (state: Todo[], action: Action) => {
			return state.filter(todo => todo.completed === false);
		}
	},
	<Todo[]>[]
);
