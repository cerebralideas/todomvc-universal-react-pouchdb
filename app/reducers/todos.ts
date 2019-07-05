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
		[addTodo]: (state: Todo[], action: Action): Todo[] => ([
			{
				id: state.reduce((maxId, todo): number => Math.max(todo.id, maxId), -1) + 1,
				completed: false,
				title: action.payload.title,
				editing: false
			},
			...state
		]),

		[deleteTodo]: (state: Todo[], action: Action): Todo[] => {
			return state.filter((todo): boolean =>
				todo.id !== action.payload.id
			);
		},

		[editingTodo]: (state: Todo[], action: Action): Todo[] => {
			return state.map((todo): Todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, { editing: true }) :
					todo
			);
		},

		[editTodo]: (state: Todo[], action: Action): Todo[] => {
			return state.map((todo): Todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, { title: action.payload.title, editing: false }) :
					todo
			);
		},

		[completeTodo]: (state: Todo[], action: Action): Todo[] => {
			return state.map((todo): Todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, {completed: !todo.completed}) :
					todo
			);
		},

		[completeAll]: (state: Todo[]): Todo[] => {
			const areAllMarked = state.every((todo): boolean => todo.completed);
			return state.map((todo): Todo => Object.assign({}, todo, {
				completed: !areAllMarked
			}));
		},

		[clearCompleted]: (state: Todo[]): Todo[] => {
			return state.filter((todo): boolean => todo.completed === false);
		}
	},
	[] as Todo[]
);
