import { get } from '../reqhandlers';
import { create, update, massUpdate } from '../posthandlers';

function init(app): void {
	app.get('/', get);
	app.get('/:filter', get);
	app.post('/todos', create);
	app.post('/api/todos', create);
	app.post('/api/todos/all', massUpdate);
	app.post('/api/todos/:id', update);
};

export default init;
