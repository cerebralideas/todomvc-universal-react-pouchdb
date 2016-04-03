"use strict";
var redux_1 = require('redux');
var index_1 = require('../reducers/index');
function configureStore() {
    var store = redux_1.createStore(index_1.default);
    return store;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
//# sourceMappingURL=configureStore.js.map