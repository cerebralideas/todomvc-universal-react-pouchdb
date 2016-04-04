"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var TodoTextInput_1 = require('./TodoTextInput');
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        _super.apply(this, arguments);
    }
    Header.prototype.handleSave = function (text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    };
    Header.prototype.render = function () {
        return (React.createElement("header", {className: "header"}, 
            React.createElement("h1", null, "todos"), 
            React.createElement(TodoTextInput_1.default, {newTodo: true, filter: this.props.filter, onSave: this.handleSave.bind(this), placeholder: "What needs to be done?"})));
    };
    Header.propTypes = {
        addTodo: react_1.PropTypes.func.isRequired,
        filter: react_1.PropTypes.string
    };
    return Header;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
//# sourceMappingURL=Header.js.map