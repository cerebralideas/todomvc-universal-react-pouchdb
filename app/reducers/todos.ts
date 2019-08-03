import { handleActions } from 'redux-actions';
import { addTodo, deleteTodo, editTodo, completeTodo, completeAll, clearCompleted } from '../actions';

import { Todo, Action } from '../interfaces';

export default handleActions(
	{
		[addTodo as any]: (state: Todo[], action: Action): Todo[] => [
			{
				id: state.reduce((maxId, todo): number => Math.max(todo.id, maxId), -1) + 1,
				completed: false,
				title: action.payload.title
			},
			...state
		],

		[deleteTodo as any]: (state: Todo[], action: Action): Todo[] => {
			return state.filter((todo): boolean => todo.id !== action.payload.id);
		},

		[editTodo as any]: (state: Todo[], action: Action): Todo[] => {
			return state.map(
				(todo): Todo =>
					todo.id === action.payload.id ? Object.assign({}, todo, { title: action.payload.title }) : todo
			);
		},

		[completeTodo as any]: (state: Todo[], action: Action): Todo[] => {
			return state.map(
				(todo): Todo =>
					todo.id === action.payload.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo
			);
		},

		[completeAll as any]: (state: Todo[]): Todo[] => {
			const areAllMarked = state.every((todo): boolean => todo.completed);
			return state.map(
				(todo): Todo =>
					Object.assign({}, todo, {
						completed: !areAllMarked
					})
			);
		},

		[clearCompleted as any]: (state: Todo[]): Todo[] => {
			return state.filter((todo): boolean => todo.completed === false);
		}
	},
	[] as Todo[]
);
