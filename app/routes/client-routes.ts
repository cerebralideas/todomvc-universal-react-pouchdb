import page from 'page';
import {
	showAll,
	showActive,
	showCompleted
} from '../actions/index'

const init = function init(store) {
	page('/', () => store.dispatch(showAll()));
	page('/show_all',  () => store.dispatch(showAll()));
	page('/show_active',  () => store.dispatch(showActive()));
	page('/show_completed',  () => store.dispatch(showCompleted()));
	page();
};

export default init;
