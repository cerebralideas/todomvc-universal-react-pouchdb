import {
	ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED,
	EDITING_TODO
} from '../constants/ActionTypes';

declare var Object: any;

const initialState = [
	{
		title: 'Use Redux',
		completed: false,
		id: 0,
		editing: false
	}
];

export default function todos(state = initialState, action): any {
	switch (action.type) {
		case ADD_TODO:
			return [
				{
					id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
					completed: false,
					title: action.title,
					editing: false
				},
				...state
			];

		case DELETE_TODO:
			return state.filter(todo =>
				todo.id !== action.id
			);

		case EDITING_TODO:
			return state.map(todo =>
				todo.id === action.id ?
					Object.assign({}, todo, { editing: true }) :
					todo
				);

		case EDIT_TODO:
			return state.map(todo =>
				todo.id === action.id ?
					Object.assign({}, todo, { title: action.title, editing: false }) :
					todo
				);

		case COMPLETE_TODO:
			return state.map(todo =>
				todo.id === action.id ?
					Object.assign({}, todo, {completed: !todo.completed}) :
					todo
				);

		case COMPLETE_ALL:
			const areAllMarked = state.every(todo => todo.completed);
			return state.map(todo => Object.assign({}, todo, {
				completed: !areAllMarked
			}));

		case CLEAR_COMPLETED:
			return state.filter(todo => todo.completed === false);

		default:
			return state;
	}
}
