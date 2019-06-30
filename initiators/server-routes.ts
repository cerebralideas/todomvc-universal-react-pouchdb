import { configureStore  } from '../store/redux-store';
import db from '../store/server-db';

const init = function (app) {

	app.get('/', function(req, res) {
		db.get(req, res, configureStore, function (req, res, model) {
			res.render('ServerLayout', model);
		});
	});
	app.get('/:filter', function(req, res) {
		db.get(req, res, configureStore, function (req, res, model) {
			res.render('ServerLayout', model);
		});
	});
	app.post('/todos', function(req, res) {
		db.create(req, res, configureStore, function (req, res, model) {
			res.redirect('/' + req.query.filter);
		});
	});
	app.post('/api/todos', function(req, res) {
		db.create(req, res, configureStore, function (req, res, model) {
			res.json(model);
		});
	});
	app.post('/api/todos/all', function(req, res) {
		db.massUpdate(req, res, configureStore, function (req, res, model) {
			res.json(model);
		});
	});
	app.post('/api/todos/:id', function(req, res) {
		db.update(req, res, configureStore, function (req, res, model) {
			res.json(model);
		});
	});
};

export default init;
