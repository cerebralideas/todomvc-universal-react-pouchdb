import page from 'page';
import { showAll, showActive, showCompleted } from '../actions/index'

const init = function init(store) {
	page('/', function () {
		store.dispatch(showAll());
	});
	page('/show_all', function () {
		store.dispatch(showAll());
	});
	page('/show_active', function () {
		store.dispatch(showActive());
	});
	page('/show_completed', function () {
		store.dispatch(showCompleted());
	});
	page();
};

export default init;
