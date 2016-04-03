"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var redux_1 = require('redux');
var react_redux_1 = require('react-redux');
var Header_1 = require('../components/Header');
var MainSection_1 = require('../components/MainSection');
var TodoActions = require('../actions/index');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        var _a = this.props, todos = _a.todos, actions = _a.actions, filter = _a.filter;
        return (React.createElement("div", null, React.createElement(Header_1.default, {addTodo: actions.addTodo, filter: filter}), React.createElement(MainSection_1.default, {todos: todos, filter: filter, actions: actions})));
    };
    App.propTypes = {
        todos: react_1.PropTypes.array.isRequired,
        filter: react_1.PropTypes.string.isRequired,
        actions: react_1.PropTypes.object.isRequired
    };
    return App;
}(react_1.Component));
function mapStateToProps(state) {
    return {
        todos: state.todos,
        filter: state.filter
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: redux_1.bindActionCreators(TodoActions, dispatch)
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=App.js.map