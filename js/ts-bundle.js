var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("utils", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    return {
        setters:[],
        execute: function() {
            Utils = (function () {
                function Utils() {
                }
                Utils.uuid = function () {
                    /*jshint bitwise:false */
                    var i, random;
                    var uuid = '';
                    for (i = 0; i < 32; i++) {
                        random = Math.random() * 16 | 0;
                        if (i === 8 || i === 12 || i === 16 || i === 20) {
                            uuid += '-';
                        }
                        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                            .toString(16);
                    }
                    return uuid;
                };
                Utils.pluralize = function (count, word) {
                    return count === 1 ? word : word + 's';
                };
                Utils.store = function (namespace, data) {
                    if (data) {
                        return localStorage.setItem(namespace, JSON.stringify(data));
                    }
                    var store = localStorage.getItem(namespace);
                    return (store && JSON.parse(store)) || [];
                };
                Utils.extend = function () {
                    var objs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        objs[_i - 0] = arguments[_i];
                    }
                    var newObj = {};
                    for (var i = 0; i < objs.length; i++) {
                        var obj = objs[i];
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                newObj[key] = obj[key];
                            }
                        }
                    }
                    return newObj;
                };
                return Utils;
            }());
            exports_1("Utils", Utils);
        }
    }
});
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
System.register("TodoModel", ["utils"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var utils_1;
    var TodoModel;
    return {
        setters:[
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            // Generic "model" object. You can use whatever
            // framework you want. For this application it
            // may not even be worth separating this logic
            // out, but we do this to demonstrate one way to
            // separate out parts of your application.
            TodoModel = (function () {
                function TodoModel(key) {
                    this.key = key;
                    this.todos = utils_1.Utils.store(key);
                    this.onChanges = [];
                }
                TodoModel.prototype.subscribe = function (onChange) {
                    this.onChanges.push(onChange);
                };
                TodoModel.prototype.inform = function () {
                    utils_1.Utils.store(this.key, this.todos);
                    this.onChanges.forEach(function (cb) { cb(); });
                };
                TodoModel.prototype.addTodo = function (title) {
                    this.todos = this.todos.concat({
                        id: utils_1.Utils.uuid(),
                        title: title,
                        completed: false
                    });
                    this.inform();
                };
                TodoModel.prototype.toggleAll = function (checked) {
                    // Note: It's usually better to use immutable data structures since they're
                    // easier to reason about and React works very well with them. That's why
                    // we use map(), filter() and reduce() everywhere instead of mutating the
                    // array or todo items themselves.
                    this.todos = this.todos.map(function (todo) {
                        return utils_1.Utils.extend({}, todo, { completed: checked });
                    });
                    this.inform();
                };
                TodoModel.prototype.toggle = function (todoToToggle) {
                    this.todos = this.todos.map(function (todo) {
                        return todo !== todoToToggle ?
                            todo :
                            utils_1.Utils.extend({}, todo, { completed: !todo.completed });
                    });
                    this.inform();
                };
                TodoModel.prototype.destroy = function (todo) {
                    this.todos = this.todos.filter(function (candidate) {
                        return candidate !== todo;
                    });
                    this.inform();
                };
                TodoModel.prototype.save = function (todoToSave, text) {
                    this.todos = this.todos.map(function (todo) {
                        return todo !== todoToSave ? todo : utils_1.Utils.extend({}, todo, { title: text });
                    });
                    this.inform();
                };
                TodoModel.prototype.clearCompleted = function () {
                    this.todos = this.todos.filter(function (todo) {
                        return !todo.completed;
                    });
                    this.inform();
                };
                return TodoModel;
            }());
            exports_2("TodoModel", TodoModel);
        }
    }
});
System.register("constants", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, ENTER_KEY, ESCAPE_KEY;
    return {
        setters:[],
        execute: function() {
            ALL_TODOS = 'all';
            ACTIVE_TODOS = 'active';
            COMPLETED_TODOS = 'completed';
            ENTER_KEY = 13;
            ESCAPE_KEY = 27;
            exports_3("ALL_TODOS", ALL_TODOS);
            exports_3("ACTIVE_TODOS", ACTIVE_TODOS);
            exports_3("COMPLETED_TODOS", COMPLETED_TODOS);
            exports_3("ENTER_KEY", ENTER_KEY);
            exports_3("ESCAPE_KEY", ESCAPE_KEY);
        }
    }
});
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
System.register("footer", ["constants", "utils"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var constants_1, utils_2;
    var TodoFooter;
    return {
        setters:[
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            }],
        execute: function() {
            TodoFooter = (function (_super) {
                __extends(TodoFooter, _super);
                function TodoFooter() {
                    _super.apply(this, arguments);
                }
                TodoFooter.prototype.render = function () {
                    var activeTodoWord = utils_2.Utils.pluralize(this.props.count, 'item');
                    var clearButton = null;
                    if (this.props.completedCount > 0) {
                        clearButton = (React.createElement("button", {className: "clear-completed", onClick: this.props.onClearCompleted}, "Clear completed"));
                    }
                    var nowShowing = this.props.nowShowing;
                    return (React.createElement("footer", {className: "footer"}, React.createElement("span", {className: "todo-count"}, React.createElement("strong", null, this.props.count), " ", activeTodoWord, " left"), React.createElement("ul", {className: "filters"}, React.createElement("li", null, React.createElement("a", {href: "#/", className: classNames({ selected: nowShowing === constants_1.ALL_TODOS })}, "All")), ' ', React.createElement("li", null, React.createElement("a", {href: "#/active", className: classNames({ selected: nowShowing === constants_1.ACTIVE_TODOS })}, "Active")), ' ', React.createElement("li", null, React.createElement("a", {href: "#/completed", className: classNames({ selected: nowShowing === constants_1.COMPLETED_TODOS })}, "Completed"))), clearButton));
                };
                return TodoFooter;
            }(React.Component));
            exports_4("TodoFooter", TodoFooter);
        }
    }
});
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
System.register("todoItem", ["constants"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var constants_2;
    var TodoItem;
    return {
        setters:[
            function (constants_2_1) {
                constants_2 = constants_2_1;
            }],
        execute: function() {
            TodoItem = (function (_super) {
                __extends(TodoItem, _super);
                function TodoItem(props) {
                    _super.call(this, props);
                    this.state = { editText: this.props.todo.title };
                }
                TodoItem.prototype.handleSubmit = function (event) {
                    var val = this.state.editText.trim();
                    if (val) {
                        this.props.onSave(val);
                        this.setState({ editText: val });
                    }
                    else {
                        this.props.onDestroy();
                    }
                };
                TodoItem.prototype.handleEdit = function () {
                    this.props.onEdit();
                    this.setState({ editText: this.props.todo.title });
                };
                TodoItem.prototype.handleKeyDown = function (event) {
                    if (event.keyCode === constants_2.ESCAPE_KEY) {
                        this.setState({ editText: this.props.todo.title });
                        this.props.onCancel(event);
                    }
                    else if (event.keyCode === constants_2.ENTER_KEY) {
                        this.handleSubmit(event);
                    }
                };
                TodoItem.prototype.handleChange = function (event) {
                    var input = event.target;
                    this.setState({ editText: input.value });
                };
                /**
                 * This is a completely optional performance enhancement that you can
                 * implement on any React component. If you were to delete this method
                 * the app would still work correctly (and still be very performant!), we
                 * just use it as an example of how little code it takes to get an order
                 * of magnitude performance improvement.
                 */
                TodoItem.prototype.shouldComponentUpdate = function (nextProps, nextState) {
                    return (nextProps.todo !== this.props.todo ||
                        nextProps.editing !== this.props.editing ||
                        nextState.editText !== this.state.editText);
                };
                /**
                 * Safely manipulate the DOM after updating the state when invoking
                 * `this.props.onEdit()` in the `handleEdit` method above.
                 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
                 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
                 */
                TodoItem.prototype.componentDidUpdate = function (prevProps) {
                    if (!prevProps.editing && this.props.editing) {
                        var node = React.findDOMNode(this.refs["editField"]);
                        node.focus();
                        node.setSelectionRange(node.value.length, node.value.length);
                    }
                };
                TodoItem.prototype.render = function () {
                    var _this = this;
                    return (React.createElement("li", {className: classNames({
                        completed: this.props.todo.completed,
                        editing: this.props.editing
                    })}, React.createElement("div", {className: "view"}, React.createElement("input", {className: "toggle", type: "checkbox", checked: this.props.todo.completed, onChange: this.props.onToggle}), React.createElement("label", {onDoubleClick: function (e) { return _this.handleEdit(); }}, this.props.todo.title), React.createElement("button", {className: "destroy", onClick: this.props.onDestroy})), React.createElement("input", {ref: "editField", className: "edit", value: this.state.editText, onBlur: function (e) { return _this.handleSubmit(e); }, onChange: function (e) { return _this.handleChange(e); }, onKeyDown: function (e) { return _this.handleKeyDown(e); }})));
                };
                return TodoItem;
            }(React.Component));
            exports_5("TodoItem", TodoItem);
        }
    }
});
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
System.register("app", ["TodoModel", "footer", "todoItem", "constants"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var TodoModel_1, footer_1, todoItem_1, constants_3;
    var TodoApp, model;
    function render() {
        React.render(React.createElement(TodoApp, {model: model}), document.getElementsByClassName('todoapp')[0]);
    }
    return {
        setters:[
            function (TodoModel_1_1) {
                TodoModel_1 = TodoModel_1_1;
            },
            function (footer_1_1) {
                footer_1 = footer_1_1;
            },
            function (todoItem_1_1) {
                todoItem_1 = todoItem_1_1;
            },
            function (constants_3_1) {
                constants_3 = constants_3_1;
            }],
        execute: function() {
            /// <reference path="../typings/tsd.d.ts" />
            /// <reference path="./interfaces.d.ts"/>
            TodoApp = (function (_super) {
                __extends(TodoApp, _super);
                function TodoApp(props) {
                    _super.call(this, props);
                    this.state = {
                        nowShowing: constants_3.ALL_TODOS,
                        editing: null
                    };
                }
                TodoApp.prototype.componentDidMount = function () {
                    var setState = this.setState;
                    var router = Router({
                        '/': setState.bind(this, { nowShowing: constants_3.ALL_TODOS }),
                        '/active': setState.bind(this, { nowShowing: constants_3.ACTIVE_TODOS }),
                        '/completed': setState.bind(this, { nowShowing: constants_3.COMPLETED_TODOS })
                    });
                    router.init('/');
                };
                TodoApp.prototype.handleNewTodoKeyDown = function (event) {
                    if (event.keyCode !== constants_3.ENTER_KEY) {
                        return;
                    }
                    event.preventDefault();
                    var val = React.findDOMNode(this.refs["newField"]).value.trim();
                    if (val) {
                        this.props.model.addTodo(val);
                        React.findDOMNode(this.refs["newField"]).value = '';
                    }
                };
                TodoApp.prototype.toggleAll = function (event) {
                    var target = event.target;
                    var checked = target.checked;
                    this.props.model.toggleAll(checked);
                };
                TodoApp.prototype.toggle = function (todoToToggle) {
                    this.props.model.toggle(todoToToggle);
                };
                TodoApp.prototype.destroy = function (todo) {
                    this.props.model.destroy(todo);
                };
                TodoApp.prototype.edit = function (todo) {
                    this.setState({ editing: todo.id });
                };
                TodoApp.prototype.save = function (todoToSave, text) {
                    this.props.model.save(todoToSave, text);
                    this.setState({ editing: null });
                };
                TodoApp.prototype.cancel = function () {
                    this.setState({ editing: null });
                };
                TodoApp.prototype.clearCompleted = function () {
                    this.props.model.clearCompleted();
                };
                TodoApp.prototype.render = function () {
                    var _this = this;
                    var footer;
                    var main;
                    var todos = this.props.model.todos;
                    var shownTodos = todos.filter(function (todo) {
                        switch (_this.state.nowShowing) {
                            case constants_3.ACTIVE_TODOS:
                                return !todo.completed;
                            case constants_3.COMPLETED_TODOS:
                                return todo.completed;
                            default:
                                return true;
                        }
                    });
                    var todoItems = shownTodos.map(function (todo) {
                        return (React.createElement(todoItem_1.TodoItem, {key: todo.id, todo: todo, onToggle: _this.toggle.bind(_this, todo), onDestroy: _this.destroy.bind(_this, todo), onEdit: _this.edit.bind(_this, todo), editing: _this.state.editing === todo.id, onSave: _this.save.bind(_this, todo), onCancel: function (e) { return _this.cancel(); }}));
                    });
                    // Note: It's usually better to use immutable data structures since they're
                    // easier to reason about and React works very well with them. That's why
                    // we use map(), filter() and reduce() everywhere instead of mutating the
                    // array or todo items themselves.
                    var activeTodoCount = todos.reduce(function (accum, todo) {
                        return todo.completed ? accum : accum + 1;
                    }, 0);
                    var completedCount = todos.length - activeTodoCount;
                    if (activeTodoCount || completedCount) {
                        footer =
                            React.createElement(footer_1.TodoFooter, {count: activeTodoCount, completedCount: completedCount, nowShowing: this.state.nowShowing, onClearCompleted: function (e) { return _this.clearCompleted(); }});
                    }
                    if (todos.length) {
                        main = (React.createElement("section", {className: "main"}, React.createElement("input", {className: "toggle-all", type: "checkbox", onChange: function (e) { return _this.toggleAll(e); }, checked: activeTodoCount === 0}), React.createElement("ul", {className: "todo-list"}, todoItems)));
                    }
                    return (React.createElement("div", null, React.createElement("header", {className: "header"}, React.createElement("h1", null, "todos"), React.createElement("input", {ref: "newField", className: "new-todo", placeholder: "What needs to be done?", onKeyDown: function (e) { return _this.handleNewTodoKeyDown(e); }, autoFocus: true})), main, footer));
                };
                return TodoApp;
            }(React.Component));
            model = new TodoModel_1.TodoModel('react-todos');
            model.subscribe(render);
            render();
        }
    }
});
