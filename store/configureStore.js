"use strict";
var redux_1 = require('redux');
var index_1 = require('../reducers/index');
function configureStore(initialState) {
    if (initialState === void 0) { initialState = {}; }
    var store = redux_1.createStore(index_1.default, initialState);
    return store;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
//# sourceMappingURL=configureStore.js.map