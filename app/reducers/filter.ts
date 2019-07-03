import { handleActions, combineActions } from 'redux-actions';
import { showAll, showActive, showCompleted } from '../actions/index';

interface Filter {
	type: string;
	payload: {
		filter: string
	};
}

export default handleActions(
	{
		[<any>combineActions(showAll, showActive, showCompleted)]: (state: string, action: Filter) => {
			return action.payload.filter;
		}

	},
	'show_all'
);
