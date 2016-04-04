import * as superagent from 'superagent';

function postNewTodo(todo) {
	superagent
		.post('/api/todos')
		.send({ todo: todo })
		.end(function postCb(err, response) {
			console.log(response);
		});
}
function postCompleteTodo(id) {
	superagent
		.post('/api/todos/' + id + '?action=complete')
		.end(function postCb(err, response) {
			console.log(response);
		});
}

export default {
	postNewTodo,
	postCompleteTodo
};
