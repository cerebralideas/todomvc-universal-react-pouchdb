"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var TodoFilters_1 = require('../constants/TodoFilters');
var FILTER_TITLES = (_a = {},
    _a[TodoFilters_1.SHOW_ALL] = 'All',
    _a[TodoFilters_1.SHOW_ACTIVE] = 'Active',
    _a[TodoFilters_1.SHOW_COMPLETED] = 'Completed',
    _a
);
var Footer = (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        _super.apply(this, arguments);
    }
    Footer.prototype.renderTodoCount = function () {
        var activeCount = this.props.activeCount;
        var itemWord = activeCount === 1 ? 'item' : 'items';
        return (React.createElement("span", {className: "todo-count"}, 
            React.createElement("strong", null, activeCount || 'No'), 
            " ", 
            itemWord, 
            " left"));
    };
    Footer.prototype.renderFilterLink = function (filter) {
        var title = FILTER_TITLES[filter];
        var selectedFilter = this.props.filter;
        var isSelected = filter === selectedFilter ? 'selected' : '';
        return (React.createElement("a", {className: isSelected, href: filter, style: { cursor: 'pointer' }}, title));
    };
    Footer.prototype.renderClearButton = function () {
        var _a = this.props, completedCount = _a.completedCount, onClearCompleted = _a.onClearCompleted;
        if (completedCount > 0) {
            return (React.createElement("button", {className: "clear-completed", onClick: onClearCompleted}, "Clear completed"));
        }
    };
    Footer.prototype.render = function () {
        var _this = this;
        return (React.createElement("footer", {className: "footer"}, 
            this.renderTodoCount(), 
            React.createElement("ul", {className: "filters"}, [TodoFilters_1.SHOW_ALL, TodoFilters_1.SHOW_ACTIVE, TodoFilters_1.SHOW_COMPLETED].map(function (filter) {
                return React.createElement("li", {key: filter}, _this.renderFilterLink(filter));
            })), 
            this.renderClearButton()));
    };
    Footer.propTypes = {
        completedCount: react_1.PropTypes.number.isRequired,
        activeCount: react_1.PropTypes.number.isRequired,
        filter: react_1.PropTypes.string.isRequired,
        onClearCompleted: react_1.PropTypes.func.isRequired
    };
    return Footer;
}(react_1.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
var _a;
//# sourceMappingURL=Footer.js.map