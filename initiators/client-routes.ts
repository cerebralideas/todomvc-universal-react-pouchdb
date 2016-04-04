import page from 'page';

const init = function init(store) {
	page('/', function () {
		store.dispatch({ type: 'SHOW_ALL' })
	});
	page('/show_all', function () {
		store.dispatch({ type: 'SHOW_ALL' })
	});
	page('/show_active', function () {
		store.dispatch({ type: 'SHOW_ACTIVE' })
	});
	page('/show_completed', function () {
		store.dispatch({ type: 'SHOW_COMPLETED' })
	});
	page();
};

export default init;
