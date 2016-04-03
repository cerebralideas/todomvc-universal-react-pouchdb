"use strict";
var React = require('react');
var react_dom_1 = require('react-dom');
var react_redux_1 = require('react-redux');
var App_1 = require('./containers/App');
var configureStore_1 = require('./store/configureStore');
var page_1 = require('page');
var store = configureStore_1.default();
page_1.default('/', function () {
    store.dispatch({ type: 'SHOW_ALL' });
});
page_1.default('/show_all', function () {
    store.dispatch({ type: 'SHOW_ALL' });
});
page_1.default('/show_active', function () {
    store.dispatch({ type: 'SHOW_ACTIVE' });
});
page_1.default('/show_completed', function () {
    store.dispatch({ type: 'SHOW_COMPLETED' });
});
page_1.default();
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store}, React.createElement(App_1.default, null)), document.getElementById('root'));
//# sourceMappingURL=client.js.map