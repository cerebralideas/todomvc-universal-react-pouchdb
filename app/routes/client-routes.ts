import page from 'page';
import { showAll, showActive, showCompleted } from '../actions';

function init(store): void {
	page('/', (): void => store.dispatch(showAll()));
	page('/show_all', (): void => store.dispatch(showAll()));
	page('/show_active', (): void => store.dispatch(showActive()));
	page('/show_completed', (): void => store.dispatch(showCompleted()));
	page();
}

export default init;
