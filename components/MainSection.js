"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var TodoItem_1 = require('./TodoItem');
var Footer_1 = require('./Footer');
var TodoFilters_1 = require('../constants/TodoFilters');
var TODO_FILTERS = (_a = {},
    _a[TodoFilters_1.SHOW_ALL] = function () { return true; },
    _a[TodoFilters_1.SHOW_ACTIVE] = function (todo) { return !todo.completed; },
    _a[TodoFilters_1.SHOW_COMPLETED] = function (todo) { return todo.completed; },
    _a
);
var MainSection = (function (_super) {
    __extends(MainSection, _super);
    function MainSection(props, context) {
        _super.call(this, props, context);
    }
    MainSection.prototype.handleClearCompleted = function () {
        this.props.actions.clearCompleted();
    };
    MainSection.prototype.renderToggleAll = function (completedCount) {
        var _a = this.props, todos = _a.todos, actions = _a.actions;
        if (todos.length > 0) {
            return (React.createElement("input", {className: "toggle-all", type: "checkbox", checked: completedCount === todos.length, onChange: actions.completeAll}));
        }
    };
    MainSection.prototype.renderFooter = function (completedCount) {
        var _a = this.props, todos = _a.todos, filter = _a.filter;
        var activeCount = todos.length - completedCount;
        if (todos.length) {
            return (React.createElement(Footer_1.default, {completedCount: completedCount, activeCount: activeCount, filter: filter, onClearCompleted: this.handleClearCompleted.bind(this)}));
        }
    };
    MainSection.prototype.render = function () {
        var _a = this.props, todos = _a.todos, actions = _a.actions, filter = _a.filter;
        var filteredTodos = todos.filter(TODO_FILTERS[filter]);
        var completedCount = todos.reduce(function (count, todo) {
            return todo.completed ? count + 1 : count;
        }, 0);
        return (React.createElement("section", {className: "main"}, this.renderToggleAll(completedCount), React.createElement("ul", {className: "todo-list"}, filteredTodos.map(function (todo) {
            return React.createElement(TodoItem_1.default, React.__spread({key: todo.id, todo: todo}, actions));
        })), this.renderFooter(completedCount)));
    };
    MainSection.propTypes = {
        todos: react_1.PropTypes.array.isRequired,
        filter: react_1.PropTypes.string.isRequired,
        actions: react_1.PropTypes.object.isRequired
    };
    return MainSection;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainSection;
var _a;
//# sourceMappingURL=MainSection.js.map