"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var App_1 = require('../containers/App');
var configureStore_1 = require('../store/configureStore');
module.exports = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        _super.apply(this, arguments);
    }
    Layout.prototype.render = function () {
        var store = configureStore_1.default(this.props);
        return (React.createElement("html", {lang: "en"}, 
            React.createElement("head", null, 
                React.createElement("meta", {charSet: "utf-8"}), 
                React.createElement("title", null, "React • TodoMVC"), 
                React.createElement("link", {rel: "stylesheet", href: "node_modules/todomvc-app-css/index.css"})), 
            React.createElement("body", null, 
                React.createElement("section", {className: "todoapp", id: "root"}, 
                    React.createElement(react_redux_1.Provider, {store: store}, 
                        React.createElement(App_1.default, null)
                    )
                ), 
                React.createElement("footer", {className: "info"}, 
                    React.createElement("p", null, "Double-click to edit a todo"), 
                    React.createElement("p", null, 
                        "Created by ", 
                        React.createElement("a", {href: "http://github.com/remojansen/"}, "Remo H. Jansen")), 
                    React.createElement("p", null, 
                        "Part of ", 
                        React.createElement("a", {href: "http://todomvc.com"}, "TodoMVC"))), 
                React.createElement("script", {type: "text/javascript", src: "https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.25/system.js"}), 
                React.createElement("script", {type: "text/javascript", src: "node_modules/babel-polyfill/dist/polyfill.js"}), 
                React.createElement("script", {type: "text/javascript", src: "bundle.js"}), 
                React.createElement("script", {dangerouslySetInnerHTML: { __html: "System.config({\n\t\t\t\t\tbaseURL: '/',\n\t\t\t\t\tmap: {\n\t\t\t\t\t'lodash': 'node_modules/lodash/lodash.js',\n\t\t\t\t\t\t'page': 'node_modules/page/index.js',\n\t\t\t\t\t\t'path-to-regexp': 'node_modules/path-to-regexp/index.js',\n\t\t\t\t\t\t'isarray': 'node_modules/isarray/index.js',\n\t\t\t\t\t\t'react': 'node_modules/react/dist/react-with-addons.js',\n\t\t\t\t\t\t'react-dom': 'node_modules/react-dom/dist/react-dom.js',\n\t\t\t\t\t\t'redux': 'node_modules/redux/dist/redux.js',\n\t\t\t\t\t\t'react-redux': 'node_modules/react-redux/dist/react-redux.js',\n\t\t\t\t\t\t'classnames': 'node_modules/classnames/index.js'\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\tSystem.import('client');"
                }}))));
    };
    Layout.propTypes = {
        store: react_1.PropTypes.object.isRequired
    };
    return Layout;
}(react_1.Component));
//# sourceMappingURL=Layout.js.map