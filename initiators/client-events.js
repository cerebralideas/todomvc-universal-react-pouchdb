"use strict";
var superagent = require('superagent');
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    postNewTodo: postNewTodo,
    postCompleteTodo: postCompleteTodo
};
//# sourceMappingURL=client-events.js.map