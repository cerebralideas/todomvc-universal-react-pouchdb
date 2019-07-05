import { handleActions, combineActions } from 'redux-actions';
import { showAll, showActive, showCompleted } from '../actions/index';

import { Action } from '../interfaces';

export default handleActions(
	{
		[combineActions(showAll, showActive, showCompleted) as any]: (state: string, action: Action): string => {
			return action.payload.filter;
		}

	},
	'show_all'
);
