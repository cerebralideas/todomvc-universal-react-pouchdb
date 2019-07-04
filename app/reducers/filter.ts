import { handleActions, combineActions } from 'redux-actions';
import { showAll, showActive, showCompleted } from '../actions/index';

import { Action } from '../interfaces';

export default handleActions(
	{
		[<any>combineActions(showAll, showActive, showCompleted)]: (state: string, action: Action) => {
			return action.payload.filter;
		}

	},
	'show_all'
);
