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

export interface State {
	title: string,
	completed: boolean,
	id: number,
	editing: boolean
}
interface Action {
	type: string,
	payload?: {
		id?: number,
		title?: string
	}
}

export default handleActions(
	{
		[addTodo]: (state: State[], action: Action) => ([
			{
				id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
				completed: false,
				title: action.payload.title,
				editing: false
			},
			...state
		]),

		[deleteTodo]: (state: State[], action: Action) => {
			return state.filter(todo =>
				todo.id !== action.payload.id
			);
		},

		[editingTodo]: (state: State[], action: Action) => {
			return state.map(todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, { editing: true }) :
					todo
				);
		},

		[editTodo]: (state: State[], action: Action) => {
			return state.map(todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, { title: action.payload.title, editing: false }) :
					todo
				);
		},

		[completeTodo]: (state: State[], action: Action) => {
			return state.map(todo =>
				todo.id === action.payload.id ?
					Object.assign({}, todo, {completed: !todo.completed}) :
					todo
				);
		},

		[completeAll]: (state: State[], action: Action) => {
			const areAllMarked = state.every(todo => todo.completed);
			return state.map(todo => Object.assign({}, todo, {
				completed: !areAllMarked
			}));
		},

		[clearCompleted]: (state: State[], action: Action) => {
			return state.filter(todo => todo.completed === false);
		}
	},
	[
		{
			title: 'Use Redux',
			completed: false,
			id: 0,
			editing: false
		}
	]
);
