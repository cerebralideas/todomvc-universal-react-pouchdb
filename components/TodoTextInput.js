"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var TodoTextInput = (function (_super) {
    __extends(TodoTextInput, _super);
    function TodoTextInput(props, context) {
        _super.call(this, props, context);
        this.state = {
            text: this.props.text || ''
        };
    }
    TodoTextInput.prototype.handleSubmit = function (e) {
        var text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo) {
                this.setState({ text: '' });
            }
        }
    };
    TodoTextInput.prototype.handleChange = function (e) {
        this.setState({ text: e.target.value });
    };
    TodoTextInput.prototype.handleBlur = function (e) {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    };
    TodoTextInput.prototype.render = function () {
        var isEditing = this.props.editing ? 'edit' : '';
        var isNew = this.props.newTodo ? 'new-todo' : '';
        return (React.createElement("form", {action: "/todos?filter=" + this.props.filter, method: "POST", onSubmit: function (e) { return e.preventDefault(); }}, 
            React.createElement("input", {className: isEditing + ' ' + isNew, name: "todo", type: "text", placeholder: this.props.placeholder, autoFocus: "true", value: this.state.text, onBlur: this.handleBlur.bind(this), onChange: this.handleChange.bind(this), onKeyDown: this.handleSubmit.bind(this)})
        ));
    };
    TodoTextInput.propTypes = {
        onSave: react_1.PropTypes.func.isRequired,
        text: react_1.PropTypes.string,
        placeholder: react_1.PropTypes.string,
        editing: react_1.PropTypes.bool,
        newTodo: react_1.PropTypes.bool,
        filter: react_1.PropTypes.string
    };
    return TodoTextInput;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodoTextInput;
//# sourceMappingURL=TodoTextInput.js.map