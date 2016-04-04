"use strict";
var React = require('react');
var react_dom_1 = require('react-dom');
var react_redux_1 = require('react-redux');
var App_1 = require('./containers/App');
var configureStore_1 = require('./store/configureStore');
var client_routes_1 = require('./initiators/client-routes');
var serverState = __REACT_ENGINE__;
var store = configureStore_1.default({
    todos: serverState.todos,
    filter: serverState.filter
});
client_routes_1.default(store);
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store}, 
    React.createElement(App_1.default, null)
), document.getElementById('root'));
//# sourceMappingURL=client.js.map