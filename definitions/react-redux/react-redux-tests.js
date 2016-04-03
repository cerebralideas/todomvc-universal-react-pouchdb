"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var react_1 = require('react');
var React = require('react');
var ReactDOM = require('react-dom');
var react_router_1 = require('react-router');
var redux_1 = require('redux');
var react_redux_1 = require('react-redux');
var objectAssign = require('object-assign');
var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        _super.apply(this, arguments);
    }
    Counter.prototype.render = function () {
        return (React.createElement("button", {onClick: this.props.onIncrement}, this.props.value));
    };
    return Counter;
}(react_1.Component));
function mapStateToProps(state) {
    return {
        value: state.counter
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onIncrement: function () { return dispatch(increment()); }
    };
}
react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Counter);
var CounterContainer = (function (_super) {
    __extends(CounterContainer, _super);
    function CounterContainer() {
        _super.apply(this, arguments);
    }
    CounterContainer = __decorate([
        react_redux_1.connect(mapStateToProps), 
        __metadata('design:paramtypes', [])
    ], CounterContainer);
    return CounterContainer;
}(react_1.Component));
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return null;
    };
    return App;
}(react_1.Component));
var targetEl = document.getElementById('root');
ReactDOM.render((React.createElement(react_redux_1.Provider, {store: store}, function () { return React.createElement(App, null); })), targetEl);
var MyRootComponent = (function (_super) {
    __extends(MyRootComponent, _super);
    function MyRootComponent() {
        _super.apply(this, arguments);
    }
    return MyRootComponent;
}(react_1.Component));
var TodoApp = (function (_super) {
    __extends(TodoApp, _super);
    function TodoApp() {
        _super.apply(this, arguments);
    }
    return TodoApp;
}(react_1.Component));
ReactDOM.render(React.createElement(react_redux_1.Provider, {store: store}, function () { return React.createElement(MyRootComponent, null); }), document.body);
ReactDOM.render(React.createElement(react_redux_1.Provider, {store: store}, function () { return React.createElement(react_router_1.Router, {history: history}, "..."); }), targetEl);
react_redux_1.connect()(TodoApp);
react_redux_1.connect(function (state) { return state; })(TodoApp);
function mapStateToProps2(state) {
    return { todos: state.todos };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps2)(TodoApp);
react_redux_1.connect(mapStateToProps2, actionCreators)(TodoApp);
function mapDispatchToProps2(dispatch) {
    return { actions: redux_1.bindActionCreators(actionCreators, dispatch) };
}
react_redux_1.connect(mapStateToProps2, mapDispatchToProps2)(TodoApp);
function mapDispatchToProps3(dispatch) {
    return redux_1.bindActionCreators({ addTodo: addTodo }, dispatch);
}
react_redux_1.connect(mapStateToProps2, mapDispatchToProps3)(TodoApp);
function mapDispatchToProps4(dispatch) {
    return {
        todoActions: redux_1.bindActionCreators(todoActionCreators, dispatch),
        counterActions: redux_1.bindActionCreators(counterActionCreators, dispatch)
    };
}
react_redux_1.connect(mapStateToProps2, mapDispatchToProps4)(TodoApp);
function mapDispatchToProps5(dispatch) {
    return {
        actions: redux_1.bindActionCreators(objectAssign({}, todoActionCreators, counterActionCreators), dispatch)
    };
}
react_redux_1.connect(mapStateToProps2, mapDispatchToProps5)(TodoApp);
function mapDispatchToProps6(dispatch) {
    return redux_1.bindActionCreators(objectAssign({}, todoActionCreators, counterActionCreators), dispatch);
}
react_redux_1.connect(mapStateToProps2, mapDispatchToProps6)(TodoApp);
function mapStateToProps3(state, ownProps) {
    return { todos: state.todos[ownProps.userId] };
}
react_redux_1.connect(mapStateToProps3)(TodoApp);
function mergeProps(stateProps, dispatchProps, ownProps) {
    return objectAssign({}, ownProps, {
        todos: stateProps.todos[ownProps.userId],
        addTodo: function (text) { return dispatchProps.addTodo(ownProps.userId, text); }
    });
}
react_redux_1.connect(mapStateToProps2, actionCreators, mergeProps)(TodoApp);
var TestComponent = (function (_super) {
    __extends(TestComponent, _super);
    function TestComponent() {
        _super.apply(this, arguments);
    }
    return TestComponent;
}(react_1.Component));
var WrappedTestComponent = react_redux_1.connect()(TestComponent);
var ATestComponent = null;
ATestComponent = TestComponent;
ATestComponent = WrappedTestComponent;
var anElement;
React.createElement(TestComponent, {property1: 42});
React.createElement(WrappedTestComponent, {property1: 42});
React.createElement(ATestComponent, {property1: 42});
var NonComponent = (function () {
    function NonComponent() {
    }
    return NonComponent;
}());
function HelloMessage(props) {
    return React.createElement("div", null, "Hello ", props.name);
}
var ConnectedHelloMessage = react_redux_1.connect()(HelloMessage);
ReactDOM.render(React.createElement(HelloMessage, {name: "Sebastian"}), document.getElementById('content'));
ReactDOM.render(React.createElement(ConnectedHelloMessage, {name: "Sebastian"}), document.getElementById('content'));
//# sourceMappingURL=react-redux-tests.js.map