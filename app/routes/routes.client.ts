import { Store } from 'redux';
import page from 'page';
import { showAll, showActive, showCompleted } from '../actions';
import { Action } from 'redux-actions';

function init(store: Store): void {
	page('/', (): Action<{ filter: string }> => store.dispatch(showAll()));
	page('/show_all', (): Action<{ filter: string }> => store.dispatch(showAll()));
	page('/show_active', (): Action<{ filter: string }> => store.dispatch(showActive()));
	page('/show_completed', (): Action<{ filter: string }> => store.dispatch(showCompleted()));
	page();
}

export default init;
