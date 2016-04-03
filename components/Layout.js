"use strict";
var React = require('react');
var App_1 = require('../containers/App');
var configureStore_1 = require('../store/configureStore');
var Layout = React.createClass({
    render: function render() {
        var store = configureStore_1.default(this.props);
        return (React.createElement("html", {lang: "en"}, React.createElement("head", null, React.createElement("meta", {charSet: "utf-8"}), React.createElement("title", null, "React • TodoMVC"), React.createElement("link", {rel: "stylesheet", href: "node_modules/todomvc-common/base.css"}), React.createElement("link", {rel: "stylesheet", href: "node_modules/todomvc-app-css/index.css"})), React.createElement("body", null, React.createElement("section", {className: "todoapp", id: "root"}, React.createElement(App_1.default, {store: store})), React.createElement("footer", {className: "info"}, React.createElement("p", null, "Double-click to edit a todo"), React.createElement("p", null, "Created by ", React.createElement("a", {href: "http://github.com/remojansen/"}, "Remo H. Jansen")), React.createElement("p", null, "Part of ", React.createElement("a", {href: "http://todomvc.com"}, "TodoMVC"))), React.createElement("script", {type: "text/javascript", src: "https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.25/system.js"}), React.createElement("script", {type: "text/javascript", src: "node_modules/babel-polyfill/dist/polyfill.js"}), React.createElement("script", {type: "text/javascript", src: "bundle.js"}), React.createElement("script", {dangerouslySetInnerHTML: { __html: "System.config({\n\t\t\t\t\tbaseURL: '/',\n\t\t\t\t\tmap: {\n\t\t\t\t\t'lodash': 'node_modules/lodash/lodash.js',\n\t\t\t\t\t\t'page': 'node_modules/page/index.js',\n\t\t\t\t\t\t'path-to-regexp': 'node_modules/page/node_modules/path-to-regexp/index.js',\n\t\t\t\t\t\t'isarray': 'node_modules/page/node_modules/path-to-regexp/node_modules/isarray/index.js',\n\t\t\t\t\t\t'react': 'node_modules/react/dist/react-with-addons.js',\n\t\t\t\t\t\t'react-dom': 'node_modules/react-dom/dist/react-dom.js',\n\t\t\t\t\t\t'redux': 'node_modules/redux/dist/redux.js',\n\t\t\t\t\t\t'react-redux': 'node_modules/react-redux/dist/react-redux.js',\n\t\t\t\t\t\t'classnames': 'node_modules/classnames/index.js'\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\tSystem.import('client');"
        }}))));
    }
});
module.exports = Layout;
//# sourceMappingURL=Layout.js.map