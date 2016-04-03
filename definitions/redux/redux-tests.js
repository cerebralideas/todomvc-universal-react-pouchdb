function counter(state, action) {
    if (!state) {
        state = 0;
    }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
function loggingMiddleware() {
    return function (next) { return function (action) {
        console.log(action.type);
        next(action);
    }; };
}
var createStoreWithMiddleware = Redux.applyMiddleware(loggingMiddleware)(Redux.createStore);
var store = createStoreWithMiddleware(counter);
store.subscribe(function () {
    return console.log(store.getState());
});
store.dispatch({ type: 'INCREMENT' });
//# sourceMappingURL=redux-tests.js.map