"use strict";
var ActionTypes_1 = require('../constants/ActionTypes');
var initialState = [
    {
        text: 'Use Redux',
        completed: false,
        id: 0
    }
];
function todos(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionTypes_1.ADD_TODO:
            return [
                {
                    id: state.reduce(function (maxId, todo) { return Math.max(todo.id, maxId); }, -1) + 1,
                    completed: false,
                    text: action.text
                }
            ].concat(state);
        case ActionTypes_1.DELETE_TODO:
            return state.filter(function (todo) {
                return todo.id !== action.id;
            });
        case ActionTypes_1.EDIT_TODO:
            return state.map(function (todo) {
                return todo.id === action.id ?
                    Object.assign({}, todo, { text: action.text }) :
                    todo;
            });
        case ActionTypes_1.COMPLETE_TODO:
            return state.map(function (todo) {
                return todo.id === action.id ?
                    Object.assign({}, todo, { completed: !todo.completed }) :
                    todo;
            });
        case ActionTypes_1.COMPLETE_ALL:
            var areAllMarked_1 = state.every(function (todo) { return todo.completed; });
            return state.map(function (todo) { return Object.assign({}, todo, {
                completed: !areAllMarked_1
            }); });
        case ActionTypes_1.CLEAR_COMPLETED:
            return state.filter(function (todo) { return todo.completed === false; });
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = todos;
//# sourceMappingURL=todos.js.map