var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("components/TodoTextInput", ['react', 'classnames'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React, react_1, classnames;
    var TodoTextInput;
    return {
        setters:[
            function (React_1) {
                React = React_1;
                react_1 = React_1;
            },
            function (classnames_1) {
                classnames = classnames_1;
            }],
        execute: function() {
            if (typeof window === 'object') {
                classnames = classnames.default;
            }
            TodoTextInput = (function (_super) {
                __extends(TodoTextInput, _super);
                function TodoTextInput(props, context) {
                    _super.call(this, props, context);
                    this.state = {
                        text: this.props.text || ''
                    };
                }
                TodoTextInput.prototype.handleSubmit = function (e) {
                    var text = e.target.value.trim();
                    if (e.which === 13) {
                        this.props.onSave(text);
                        if (this.props.newTodo) {
                            this.setState({ text: '' });
                        }
                    }
                };
                TodoTextInput.prototype.handleChange = function (e) {
                    this.setState({ text: e.target.value });
                };
                TodoTextInput.prototype.handleBlur = function (e) {
                    if (!this.props.newTodo) {
                        this.props.onSave(e.target.value);
                    }
                };
                TodoTextInput.prototype.render = function () {
                    return (React.createElement("form", {action: "/todos?filter=" + this.props.filter, method: "POST", onSubmit: function (e) { return e.preventDefault(); }}, React.createElement("input", {className: classnames({
                        edit: this.props.editing,
                        'new-todo': this.props.newTodo
                    }), name: "todo", type: "text", placeholder: this.props.placeholder, autoFocus: "true", value: this.state.text, onBlur: this.handleBlur.bind(this), onChange: this.handleChange.bind(this), onKeyDown: this.handleSubmit.bind(this)})));
                };
                TodoTextInput.propTypes = {
                    onSave: react_1.PropTypes.func.isRequired,
                    text: react_1.PropTypes.string,
                    placeholder: react_1.PropTypes.string,
                    editing: react_1.PropTypes.bool,
                    newTodo: react_1.PropTypes.bool,
                    filter: react_1.PropTypes.string
                };
                return TodoTextInput;
            }(react_1.Component));
            exports_1("default",TodoTextInput);
        }
    }
});
System.register("components/Header", ['react', "components/TodoTextInput"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var React, react_2, TodoTextInput_1;
    var Header;
    return {
        setters:[
            function (React_2) {
                React = React_2;
                react_2 = React_2;
            },
            function (TodoTextInput_1_1) {
                TodoTextInput_1 = TodoTextInput_1_1;
            }],
        execute: function() {
            Header = (function (_super) {
                __extends(Header, _super);
                function Header() {
                    _super.apply(this, arguments);
                }
                Header.prototype.handleSave = function (text) {
                    if (text.length !== 0) {
                        this.props.addTodo(text);
                    }
                };
                Header.prototype.render = function () {
                    return (React.createElement("header", {className: "header"}, React.createElement("h1", null, "todos"), React.createElement(TodoTextInput_1["default"], {newTodo: true, filter: this.props.filter, onSave: this.handleSave.bind(this), placeholder: "What needs to be done?"})));
                };
                Header.propTypes = {
                    addTodo: react_2.PropTypes.func.isRequired,
                    filter: react_2.PropTypes.string
                };
                return Header;
            }(react_2.Component));
            exports_2("default",Header);
        }
    }
});
System.register("components/TodoItem", ['react', 'classnames', "components/TodoTextInput"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var React, react_3, classnames, TodoTextInput_2;
    var TodoItem;
    return {
        setters:[
            function (React_3) {
                React = React_3;
                react_3 = React_3;
            },
            function (classnames_2) {
                classnames = classnames_2;
            },
            function (TodoTextInput_2_1) {
                TodoTextInput_2 = TodoTextInput_2_1;
            }],
        execute: function() {
            if (typeof window === 'object') {
                classnames = classnames.default;
            }
            TodoItem = (function (_super) {
                __extends(TodoItem, _super);
                function TodoItem(props, context) {
                    _super.call(this, props, context);
                    this.state = {
                        editing: false
                    };
                }
                TodoItem.prototype.handleDoubleClick = function () {
                    this.setState({ editing: true });
                };
                TodoItem.prototype.handleSave = function (id, text) {
                    if (text.length === 0) {
                        this.props.deleteTodo(id);
                    }
                    else {
                        this.props.editTodo(id, text);
                    }
                    this.setState({ editing: false });
                };
                TodoItem.prototype.render = function () {
                    var _this = this;
                    var _a = this.props, todo = _a.todo, completeTodo = _a.completeTodo, deleteTodo = _a.deleteTodo, filter = _a.filter;
                    var element;
                    if (this.state.editing) {
                        element = (React.createElement(TodoTextInput_2["default"], {text: todo.text, filter: filter, editing: this.state.editing, onSave: function (text) { return _this.handleSave(todo.id, text); }}));
                    }
                    else {
                        element = (React.createElement("div", {className: "view"}, React.createElement("input", {className: "toggle", type: "checkbox", checked: todo.completed, onChange: function () { return completeTodo(todo.id); }}), React.createElement("label", {onDoubleClick: this.handleDoubleClick.bind(this)}, todo.text), React.createElement("button", {className: "destroy", onClick: function () { return deleteTodo(todo.id); }})));
                    }
                    return (React.createElement("li", {className: classnames({
                        completed: todo.completed,
                        editing: this.state.editing
                    })}, element));
                };
                TodoItem.propTypes = {
                    todo: react_3.PropTypes.object.isRequired,
                    editTodo: react_3.PropTypes.func.isRequired,
                    deleteTodo: react_3.PropTypes.func.isRequired,
                    completeTodo: react_3.PropTypes.func.isRequired,
                    filter: react_3.PropTypes.string.isRequired
                };
                return TodoItem;
            }(react_3.Component));
            exports_3("default",TodoItem);
        }
    }
});
System.register("constants/TodoFilters", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE;
    return {
        setters:[],
        execute: function() {
            exports_4("SHOW_ALL", SHOW_ALL = 'show_all');
            exports_4("SHOW_COMPLETED", SHOW_COMPLETED = 'show_completed');
            exports_4("SHOW_ACTIVE", SHOW_ACTIVE = 'show_active');
        }
    }
});
/// <reference path="../definitions/classnames/classnames.d.ts" />
System.register("components/Footer", ['react', 'classnames', "constants/TodoFilters"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var React, react_4, classnames, TodoFilters_1;
    var FILTER_TITLES, Footer;
    return {
        setters:[
            function (React_4) {
                React = React_4;
                react_4 = React_4;
            },
            function (classnames_3) {
                classnames = classnames_3;
            },
            function (TodoFilters_1_1) {
                TodoFilters_1 = TodoFilters_1_1;
            }],
        execute: function() {
            if (typeof window === 'object') {
                classnames = classnames.default;
            }
            FILTER_TITLES = (_a = {},
                _a[TodoFilters_1.SHOW_ALL] = 'All',
                _a[TodoFilters_1.SHOW_ACTIVE] = 'Active',
                _a[TodoFilters_1.SHOW_COMPLETED] = 'Completed',
                _a
            );
            Footer = (function (_super) {
                __extends(Footer, _super);
                function Footer() {
                    _super.apply(this, arguments);
                }
                Footer.prototype.renderTodoCount = function () {
                    var activeCount = this.props.activeCount;
                    var itemWord = activeCount === 1 ? 'item' : 'items';
                    return (React.createElement("span", {className: "todo-count"}, React.createElement("strong", null, activeCount || 'No'), " ", itemWord, " left"));
                };
                Footer.prototype.renderFilterLink = function (filter) {
                    var title = FILTER_TITLES[filter];
                    var selectedFilter = this.props.filter;
                    return (React.createElement("a", {className: classnames({ selected: filter === selectedFilter }), href: filter, style: { cursor: 'pointer' }}, title));
                };
                Footer.prototype.renderClearButton = function () {
                    var _a = this.props, completedCount = _a.completedCount, onClearCompleted = _a.onClearCompleted;
                    if (completedCount > 0) {
                        return (React.createElement("button", {className: "clear-completed", onClick: onClearCompleted}, "Clear completed"));
                    }
                };
                Footer.prototype.render = function () {
                    var _this = this;
                    return (React.createElement("footer", {className: "footer"}, this.renderTodoCount(), React.createElement("ul", {className: "filters"}, [TodoFilters_1.SHOW_ALL, TodoFilters_1.SHOW_ACTIVE, TodoFilters_1.SHOW_COMPLETED].map(function (filter) {
                        return React.createElement("li", {key: filter}, _this.renderFilterLink(filter));
                    })), this.renderClearButton()));
                };
                Footer.propTypes = {
                    completedCount: react_4.PropTypes.number.isRequired,
                    activeCount: react_4.PropTypes.number.isRequired,
                    filter: react_4.PropTypes.string.isRequired,
                    onClearCompleted: react_4.PropTypes.func.isRequired
                };
                return Footer;
            }(react_4.Component));
            exports_5("default",Footer);
        }
    }
    var _a;
});
System.register("components/MainSection", ['react', "components/TodoItem", "components/Footer", "constants/TodoFilters"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var React, react_5, TodoItem_1, Footer_1, TodoFilters_2;
    var TODO_FILTERS, MainSection;
    return {
        setters:[
            function (React_5) {
                React = React_5;
                react_5 = React_5;
            },
            function (TodoItem_1_1) {
                TodoItem_1 = TodoItem_1_1;
            },
            function (Footer_1_1) {
                Footer_1 = Footer_1_1;
            },
            function (TodoFilters_2_1) {
                TodoFilters_2 = TodoFilters_2_1;
            }],
        execute: function() {
            TODO_FILTERS = (_b = {},
                _b[TodoFilters_2.SHOW_ALL] = function () { return true; },
                _b[TodoFilters_2.SHOW_ACTIVE] = function (todo) { return !todo.completed; },
                _b[TodoFilters_2.SHOW_COMPLETED] = function (todo) { return todo.completed; },
                _b
            );
            MainSection = (function (_super) {
                __extends(MainSection, _super);
                function MainSection(props, context) {
                    _super.call(this, props, context);
                }
                MainSection.prototype.handleClearCompleted = function () {
                    this.props.actions.clearCompleted();
                };
                MainSection.prototype.renderToggleAll = function (completedCount) {
                    var _a = this.props, todos = _a.todos, actions = _a.actions;
                    if (todos.length > 0) {
                        return (React.createElement("input", {className: "toggle-all", type: "checkbox", checked: completedCount === todos.length, onChange: actions.completeAll}));
                    }
                };
                MainSection.prototype.renderFooter = function (completedCount) {
                    var _a = this.props, todos = _a.todos, filter = _a.filter;
                    var activeCount = todos.length - completedCount;
                    if (todos.length) {
                        return (React.createElement(Footer_1["default"], {completedCount: completedCount, activeCount: activeCount, filter: filter, onClearCompleted: this.handleClearCompleted.bind(this)}));
                    }
                };
                MainSection.prototype.render = function () {
                    var _a = this.props, todos = _a.todos, actions = _a.actions, filter = _a.filter;
                    var filteredTodos = todos.filter(TODO_FILTERS[filter]);
                    var completedCount = todos.reduce(function (count, todo) {
                        return todo.completed ? count + 1 : count;
                    }, 0);
                    return (React.createElement("section", {className: "main"}, this.renderToggleAll(completedCount), React.createElement("ul", {className: "todo-list"}, filteredTodos.map(function (todo) {
                        return React.createElement(TodoItem_1["default"], React.__spread({key: todo.id, todo: todo, filter: filter}, actions));
                    })), this.renderFooter(completedCount)));
                };
                MainSection.propTypes = {
                    todos: react_5.PropTypes.array.isRequired,
                    filter: react_5.PropTypes.string.isRequired,
                    actions: react_5.PropTypes.object.isRequired
                };
                return MainSection;
            }(react_5.Component));
            exports_6("default",MainSection);
        }
    }
    var _a, _b;
});
System.register("constants/ActionTypes", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED;
    return {
        setters:[],
        execute: function() {
            exports_7("ADD_TODO", ADD_TODO = 'ADD_TODO');
            exports_7("DELETE_TODO", DELETE_TODO = 'DELETE_TODO');
            exports_7("EDIT_TODO", EDIT_TODO = 'EDIT_TODO');
            exports_7("COMPLETE_TODO", COMPLETE_TODO = 'COMPLETE_TODO');
            exports_7("COMPLETE_ALL", COMPLETE_ALL = 'COMPLETE_ALL');
            exports_7("CLEAR_COMPLETED", CLEAR_COMPLETED = 'CLEAR_COMPLETED');
            exports_7("SHOW_ALL", SHOW_ALL = 'SHOW_ALL');
            exports_7("SHOW_ACTIVE", SHOW_ACTIVE = 'SHOW_ACTIVE');
            exports_7("SHOW_COMPLETED", SHOW_COMPLETED = 'SHOW_COMPLETED');
        }
    }
    var _a, _b;
});
System.register("actions/index", ["constants/ActionTypes"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var types;
    function addTodo(text) {
        return { type: types.ADD_TODO, text: text };
    }
    exports_8("addTodo", addTodo);
    function deleteTodo(id) {
        return { type: types.DELETE_TODO, id: id };
    }
    exports_8("deleteTodo", deleteTodo);
    function editTodo(id, text) {
        return { type: types.EDIT_TODO, id: id, text: text };
    }
    exports_8("editTodo", editTodo);
    function completeTodo(id) {
        return { type: types.COMPLETE_TODO, id: id };
    }
    exports_8("completeTodo", completeTodo);
    function completeAll() {
        return { type: types.COMPLETE_ALL };
    }
    exports_8("completeAll", completeAll);
    function clearCompleted() {
        return { type: types.CLEAR_COMPLETED };
    }
    exports_8("clearCompleted", clearCompleted);
    function showAll() {
        return { type: types.SHOW_ALL };
    }
    exports_8("showAll", showAll);
    function showActive() {
        return { type: types.SHOW_ACTIVE };
    }
    exports_8("showActive", showActive);
    function showCompleted() {
        return { type: types.SHOW_COMPLETED };
    }
    exports_8("showCompleted", showCompleted);
    return {
        setters:[
            function (types_1) {
                types = types_1;
            }],
        execute: function() {
        }
    }
    var _a, _b;
});
System.register("containers/App", ['react', 'redux', 'react-redux', "components/Header", "components/MainSection", "actions/index"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var React, react_6, redux_1, react_redux_1, Header_1, MainSection_1, TodoActions;
    var App;
    function mapStateToProps(state) {
        return {
            todos: state.todos,
            filter: state.filter
        };
    }
    function mapDispatchToProps(dispatch) {
        return {
            actions: redux_1.bindActionCreators(TodoActions, dispatch)
        };
    }
    return {
        setters:[
            function (React_6) {
                React = React_6;
                react_6 = React_6;
            },
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (react_redux_1_1) {
                react_redux_1 = react_redux_1_1;
            },
            function (Header_1_1) {
                Header_1 = Header_1_1;
            },
            function (MainSection_1_1) {
                MainSection_1 = MainSection_1_1;
            },
            function (TodoActions_1) {
                TodoActions = TodoActions_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App() {
                    _super.apply(this, arguments);
                }
                App.prototype.render = function () {
                    var _a = this.props, todos = _a.todos, actions = _a.actions, filter = _a.filter;
                    return (React.createElement("div", null, React.createElement(Header_1["default"], {addTodo: actions.addTodo, filter: filter}), React.createElement(MainSection_1["default"], {todos: todos, filter: filter, actions: actions})));
                };
                App.propTypes = {
                    todos: react_6.PropTypes.array.isRequired,
                    filter: react_6.PropTypes.string.isRequired,
                    actions: react_6.PropTypes.object.isRequired
                };
                return App;
            }(react_6.Component));
            exports_9("default",react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App));
        }
    }
    var _a, _b;
});
System.register("reducers/todos", ["constants/ActionTypes", 'lodash'], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var ActionTypes_1, _;
    var initialState;
    function todos(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case ActionTypes_1.ADD_TODO:
                return [
                    {
                        id: state.reduce(function (maxId, todo) { return Math.max(todo.id, maxId); }, -1) + 1,
                        completed: false,
                        text: action.text
                    }
                ].concat(state);
            case ActionTypes_1.DELETE_TODO:
                return state.filter(function (todo) {
                    return todo.id !== action.id;
                });
            case ActionTypes_1.EDIT_TODO:
                return state.map(function (todo) {
                    return todo.id === action.id ?
                        _.assign({}, todo, { text: action.text }) :
                        todo;
                });
            case ActionTypes_1.COMPLETE_TODO:
                return state.map(function (todo) {
                    return todo.id === action.id ?
                        _.assign({}, todo, { completed: !todo.completed }) :
                        todo;
                });
            case ActionTypes_1.COMPLETE_ALL:
                var areAllMarked_1 = state.every(function (todo) { return todo.completed; });
                return state.map(function (todo) { return _.assign({}, todo, {
                    completed: !areAllMarked_1
                }); });
            case ActionTypes_1.CLEAR_COMPLETED:
                return state.filter(function (todo) { return todo.completed === false; });
            default:
                return state;
        }
    }
    exports_10("default", todos);
    return {
        setters:[
            function (ActionTypes_1_1) {
                ActionTypes_1 = ActionTypes_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            initialState = [
                {
                    text: 'Use Redux',
                    completed: false,
                    id: 0
                }
            ];
        }
    }
    var _a, _b;
});
System.register("reducers/filter", ["constants/ActionTypes"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var ActionTypes_2;
    var initialState;
    function filters(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case ActionTypes_2.SHOW_ALL:
                return 'show_all';
            case ActionTypes_2.SHOW_ACTIVE:
                return 'show_active';
            case ActionTypes_2.SHOW_COMPLETED:
                return 'show_completed';
            default:
                return state;
        }
    }
    exports_11("default", filters);
    return {
        setters:[
            function (ActionTypes_2_1) {
                ActionTypes_2 = ActionTypes_2_1;
            }],
        execute: function() {
            initialState = 'show_all';
        }
    }
    var _a, _b;
});
System.register("reducers/index", ['redux', "reducers/todos", "reducers/filter"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var redux_2, todos_1, filter_1;
    var rootReducer;
    return {
        setters:[
            function (redux_2_1) {
                redux_2 = redux_2_1;
            },
            function (todos_1_1) {
                todos_1 = todos_1_1;
            },
            function (filter_1_1) {
                filter_1 = filter_1_1;
            }],
        execute: function() {
            rootReducer = redux_2.combineReducers({
                todos: todos_1["default"],
                filter: filter_1["default"]
            });
            exports_12("default",rootReducer);
        }
    }
    var _a, _b;
});
System.register("store/configureStore", ['redux', "reducers/index"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var redux_3, index_1;
    function configureStore(initialState) {
        if (initialState === void 0) { initialState = {}; }
        var store = redux_3.createStore(index_1["default"], initialState);
        return store;
    }
    exports_13("default", configureStore);
    return {
        setters:[
            function (redux_3_1) {
                redux_3 = redux_3_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
        }
    }
    var _a, _b;
});
/// <reference path="./definitions/tsd.d.ts" />
System.register("client", ['react', 'react-dom', 'react-redux', "containers/App", "store/configureStore", 'page'], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var React, react_dom_1, react_redux_2, App_1, configureStore_1, page_1;
    var store;
    return {
        setters:[
            function (React_7) {
                React = React_7;
            },
            function (react_dom_1_1) {
                react_dom_1 = react_dom_1_1;
            },
            function (react_redux_2_1) {
                react_redux_2 = react_redux_2_1;
            },
            function (App_1_1) {
                App_1 = App_1_1;
            },
            function (configureStore_1_1) {
                configureStore_1 = configureStore_1_1;
            },
            function (page_1_1) {
                page_1 = page_1_1;
            }],
        execute: function() {
            store = configureStore_1["default"]();
            page_1["default"]('/', function () { store.dispatch({ type: 'SHOW_ALL' }); });
            page_1["default"]('/show_all', function () { store.dispatch({ type: 'SHOW_ALL' }); });
            page_1["default"]('/show_active', function () { store.dispatch({ type: 'SHOW_ACTIVE' }); });
            page_1["default"]('/show_completed', function () { store.dispatch({ type: 'SHOW_COMPLETED' }); });
            page_1["default"]();
            react_dom_1.render(React.createElement(react_redux_2.Provider, {store: store}, React.createElement(App_1["default"], null)), document.getElementById('root'));
        }
    }
    var _a, _b;
});
