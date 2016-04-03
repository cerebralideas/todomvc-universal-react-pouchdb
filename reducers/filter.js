"use strict";
var ActionTypes_1 = require('../constants/ActionTypes');
var initialState = 'show_all';
function filters(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionTypes_1.SHOW_ALL:
            return 'show_all';
        case ActionTypes_1.SHOW_ACTIVE:
            return 'show_active';
        case ActionTypes_1.SHOW_COMPLETED:
            return 'show_completed';
        default:
            return state;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = filters;
//# sourceMappingURL=filter.js.map