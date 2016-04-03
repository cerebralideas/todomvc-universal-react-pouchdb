import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/ActionTypes';

const initialState = 'show_all';

export default function filters(state = initialState, action): any {
	switch (action.type) {
		case SHOW_ALL:
			return 'show_all';

		case SHOW_ACTIVE:
			return 'show_active';

		case SHOW_COMPLETED:
			return 'show_completed';

		default:
			return state;
	}
}
