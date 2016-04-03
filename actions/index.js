"use strict";
var types = require('../constants/ActionTypes');
function addTodo(text) {
    return { type: types.ADD_TODO, text: text };
}
exports.addTodo = addTodo;
function deleteTodo(id) {
    return { type: types.DELETE_TODO, id: id };
}
exports.deleteTodo = deleteTodo;
function editTodo(id, text) {
    return { type: types.EDIT_TODO, id: id, text: text };
}
exports.editTodo = editTodo;
function completeTodo(id) {
    return { type: types.COMPLETE_TODO, id: id };
}
exports.completeTodo = completeTodo;
function completeAll() {
    return { type: types.COMPLETE_ALL };
}
exports.completeAll = completeAll;
function clearCompleted() {
    return { type: types.CLEAR_COMPLETED };
}
exports.clearCompleted = clearCompleted;
function showAll() {
    return { type: types.SHOW_ALL };
}
exports.showAll = showAll;
function showActive() {
    return { type: types.SHOW_ACTIVE };
}
exports.showActive = showActive;
function showCompleted() {
    return { type: types.SHOW_COMPLETED };
}
exports.showCompleted = showCompleted;
//# sourceMappingURL=index.js.map