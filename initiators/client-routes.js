"use strict";
var page_1 = require('page');
var init = function init(store) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = init;
//# sourceMappingURL=client-routes.js.map