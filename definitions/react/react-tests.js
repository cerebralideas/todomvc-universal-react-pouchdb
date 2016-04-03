"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var ReactDOMServer = require("react-dom/server");
var createFragment = require("react-addons-create-fragment");
var CSSTransitionGroup = require("react-addons-css-transition-group");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var Perf = require("react-addons-perf");
var PureRenderMixin = require("react-addons-pure-render-mixin");
var shallowCompare = require("react-addons-shallow-compare");
var TestUtils = require("react-addons-test-utils");
var TransitionGroup = require("react-addons-transition-group");
var update = require("react-addons-update");
var props = {
    key: 42,
    ref: "myComponent42",
    hello: "world",
    foo: 42
};
var container;
var ClassicComponent = React.createClass({
    getDefaultProps: function () {
        return {
            hello: undefined,
            world: "peace",
            foo: undefined
        };
    },
    getInitialState: function () {
        return {
            inputValue: this.context.someValue,
            seconds: this.props.foo
        };
    },
    reset: function () {
        this.replaceState(this.getInitialState());
    },
    render: function () {
        var _this = this;
        return React.DOM.div(null, React.DOM.input({
            ref: function (input) { return _this._input = input; },
            value: this.state.inputValue
        }));
    }
});
var ModernComponent = (function (_super) {
    __extends(ModernComponent, _super);
    function ModernComponent() {
        _super.apply(this, arguments);
        this.state = {
            inputValue: this.context.someValue,
            seconds: this.props.foo
        };
    }
    ModernComponent.prototype.getChildContext = function () {
        return {
            someOtherValue: "foo"
        };
    };
    ModernComponent.prototype.reset = function () {
        this._myComponent.reset();
        this.setState({
            inputValue: this.context.someValue,
            seconds: this.props.foo
        });
    };
    ModernComponent.prototype.render = function () {
        var _this = this;
        return React.DOM.div(null, React.DOM.input({
            ref: function (input) { return _this._input = input; },
            value: this.state.inputValue
        }));
    };
    ModernComponent.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        return shallowCompare(this, nextProps, nextState);
    };
    ModernComponent.propTypes = {
        foo: React.PropTypes.number
    };
    ModernComponent.contextTypes = {
        someValue: React.PropTypes.string
    };
    ModernComponent.childContextTypes = {
        someOtherValue: React.PropTypes.string
    };
    return ModernComponent;
}(React.Component));
function StatelessComponent(props) {
    return React.DOM.div(null, props.foo);
}
;
var StatelessComponent;
(function (StatelessComponent) {
    StatelessComponent.displayName = "StatelessComponent";
    StatelessComponent.defaultProps = { foo: 42 };
})(StatelessComponent || (StatelessComponent = {}));
var StatelessComponent2 = function (props) { return React.DOM.div(null, props.foo); };
StatelessComponent2.displayName = "StatelessComponent2";
StatelessComponent2.defaultProps = {
    foo: 42
};
var factory = React.createFactory(ModernComponent);
var factoryElement = factory(props);
var statelessFactory = React.createFactory(StatelessComponent);
var statelessElement = statelessFactory(props);
var classicFactory = React.createFactory(ClassicComponent);
var classicFactoryElement = classicFactory(props);
var domFactory = React.createFactory("foo");
var domFactoryElement = domFactory();
var element = React.createElement(ModernComponent, props);
var statelessElement = React.createElement(StatelessComponent, props);
var classicElement = React.createElement(ClassicComponent, props);
var domElement = React.createElement("div");
var clonedElement = React.cloneElement(element, { foo: 43 });
var clonedElement2 = React.cloneElement(element, {
    ref: function (c) { return c.reset(); }
});
var clonedElement3 = React.cloneElement(element, {
    key: "8eac7",
    foo: 55
});
var clonedStatelessElement = React.cloneElement(statelessElement, { foo: 44 });
var clonedClassicElement = React.cloneElement(classicElement, props);
var clonedDOMElement = React.cloneElement(domElement, {
    className: "clonedElement"
});
var component = ReactDOM.render(element, container);
var classicComponent = ReactDOM.render(classicElement, container);
var domComponent = ReactDOM.render(domElement, container);
var unmounted = ReactDOM.unmountComponentAtNode(container);
var str = ReactDOMServer.renderToString(element);
var markup = ReactDOMServer.renderToStaticMarkup(element);
var notValid = React.isValidElement(props);
var isValid = React.isValidElement(element);
var domNode = ReactDOM.findDOMNode(component);
domNode = ReactDOM.findDOMNode(domNode);
var type = element.type;
var elementProps = element.props;
var key = element.key;
var t;
var name = typeof t === "string" ? t : t.displayName;
var displayName = ClassicComponent.displayName;
var defaultProps = ClassicComponent.getDefaultProps();
var propTypes = ClassicComponent.propTypes;
var componentState = component.state;
component.setState({ inputValue: "!!!" });
component.forceUpdate();
var isMounted = classicComponent.isMounted();
classicComponent.replaceState({ inputValue: "???", seconds: 60 });
var myComponent = component;
myComponent.reset();
var RefComponent = (function (_super) {
    __extends(RefComponent, _super);
    function RefComponent() {
        _super.apply(this, arguments);
    }
    RefComponent.prototype.refMethod = function () {
    };
    RefComponent.create = React.createFactory(RefComponent);
    return RefComponent;
}(React.Component));
var componentRef;
RefComponent.create({ ref: "componentRef" });
RefComponent.create({ ref: function (c) { return componentRef = c; } });
componentRef.refMethod();
var domNodeRef;
React.DOM.div({ ref: "domRef" });
React.DOM.div({ ref: function (node) { return domNodeRef = node; } });
var inputNodeRef;
React.DOM.input({ ref: function (node) { return inputNodeRef = node; } });
var children = ["Hello world", [null], React.DOM.span(null)];
var divStyle = {
    flex: "1 1 main-size",
    backgroundImage: "url('hello.png')"
};
var htmlAttr = {
    key: 36,
    ref: "htmlComponent",
    children: children,
    className: "test-attr",
    style: divStyle,
    onClick: function (event) {
        event.preventDefault();
        event.stopPropagation();
    },
    dangerouslySetInnerHTML: {
        __html: "<strong>STRONG</strong>"
    }
};
React.DOM.div(htmlAttr);
React.DOM.span(htmlAttr);
React.DOM.input(htmlAttr);
React.DOM.svg({ viewBox: "0 0 48 48" }, React.DOM.rect({
    x: 22,
    y: 10,
    width: 4,
    height: 28
}), React.DOM.rect({
    x: 10,
    y: 22,
    width: 28,
    height: 4
}));
var PropTypesSpecification = {
    propTypes: {
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        optionalFunc: React.PropTypes.func,
        optionalNumber: React.PropTypes.number,
        optionalObject: React.PropTypes.object,
        optionalString: React.PropTypes.string,
        optionalNode: React.PropTypes.node,
        optionalElement: React.PropTypes.element,
        optionalMessage: React.PropTypes.instanceOf(Date),
        optionalEnum: React.PropTypes.oneOf(["News", "Photos"]),
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Date)
        ]),
        optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
        optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
        optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),
        requiredFunc: React.PropTypes.func.isRequired,
        requiredAny: React.PropTypes.any.isRequired,
        customProp: function (props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error("Validation failed!");
            }
            return null;
        }
    },
    render: function () {
        return null;
    }
};
var ContextTypesSpecification = {
    contextTypes: {
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        optionalFunc: React.PropTypes.func,
        optionalNumber: React.PropTypes.number,
        optionalObject: React.PropTypes.object,
        optionalString: React.PropTypes.string,
        optionalNode: React.PropTypes.node,
        optionalElement: React.PropTypes.element,
        optionalMessage: React.PropTypes.instanceOf(Date),
        optionalEnum: React.PropTypes.oneOf(["News", "Photos"]),
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.instanceOf(Date)
        ]),
        optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
        optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
        optionalObjectWithShape: React.PropTypes.shape({
            color: React.PropTypes.string,
            fontSize: React.PropTypes.number
        }),
        requiredFunc: React.PropTypes.func.isRequired,
        requiredAny: React.PropTypes.any.isRequired,
        customProp: function (props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error("Validation failed!");
            }
            return null;
        }
    },
    render: function () {
        return null;
    }
};
var mappedChildrenArray = React.Children.map(children, function (child) { return 42; });
React.Children.forEach(children, function (child) { });
var nChildren = React.Children.count(children);
var onlyChild = React.Children.only(React.DOM.div());
onlyChild = React.Children.only([null, [[["Hallo"], true]], false]);
var childrenToArray = React.Children.toArray(children);
var Timer = (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        _super.apply(this, arguments);
        this.state = {
            secondsElapsed: 0
        };
    }
    Timer.prototype.tick = function () {
        this.setState(function (prevState, props) { return ({
            secondsElapsed: prevState.secondsElapsed + 1
        }); });
    };
    Timer.prototype.componentDidMount = function () {
        var _this = this;
        this._interval = setInterval(function () { return _this.tick(); }, 1000);
    };
    Timer.prototype.componentWillUnmount = function () {
        clearInterval(this._interval);
    };
    Timer.prototype.render = function () {
        return React.DOM.div(null, "Seconds Elapsed: ", this.state.secondsElapsed);
    };
    return Timer;
}(React.Component));
ReactDOM.render(React.createElement(Timer), container);
createFragment({
    a: React.DOM.div(),
    b: ["a", false, React.createElement("span")]
});
React.createFactory(CSSTransitionGroup)({
    component: React.createClass({
        render: function () { return null; }
    }),
    childFactory: function (c) { return c; },
    transitionName: "transition",
    transitionAppear: false,
    transitionEnter: true,
    transitionLeave: true
});
React.createFactory(CSSTransitionGroup)({
    transitionName: {
        enter: "enter",
        enterActive: "enterActive",
        leave: "leave",
        leaveActive: "leaveActive",
        appear: "appear",
        appearActive: "appearActive"
    }
});
React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function () {
        return {
            isChecked: false,
            message: "hello!"
        };
    },
    render: function () {
        return React.DOM.div(null, React.DOM.input({
            type: "checkbox",
            checkedLink: this.linkState("isChecked")
        }), React.DOM.input({
            type: "text",
            valueLink: this.linkState("message")
        }));
    }
});
Perf.start();
Perf.stop();
var measurements = Perf.getLastMeasurements();
Perf.printInclusive(measurements);
Perf.printExclusive(measurements);
Perf.printWasted(measurements);
Perf.printDOM(measurements);
React.createClass({
    mixins: [PureRenderMixin],
    render: function () { return React.DOM.div(null); }
});
var inst = TestUtils.renderIntoDocument(element);
var node = TestUtils.renderIntoDocument(React.DOM.div());
TestUtils.Simulate.click(node);
TestUtils.Simulate.change(node);
TestUtils.Simulate.keyDown(node, { key: "Enter" });
var renderer = TestUtils.createRenderer();
renderer.render(React.createElement(Timer));
var output = renderer.getRenderOutput();
var foundComponent = TestUtils.findRenderedComponentWithType(inst, ModernComponent);
var foundComponents = TestUtils.scryRenderedComponentsWithType(inst, ModernComponent);
var emptyElement;
if (TestUtils.isElementOfType(emptyElement, StatelessComponent)) {
    emptyElement.props.foo;
}
var anyInstance;
if (TestUtils.isDOMComponent(anyInstance)) {
    anyInstance.getAttribute("className");
}
else if (TestUtils.isCompositeComponent(anyInstance)) {
    anyInstance.props;
}
React.createFactory(TransitionGroup)({ component: "div" });
{
    var initialArray = [1, 2, 3];
    var newArray = update(initialArray, { $push: [4] });
    var collection = [1, 2, { a: [12, 17, 15] }];
    var newCollection = update(collection, { 2: { a: { $splice: [[1, 1, 13, 14]] } } });
    var obj = { a: 5, b: 3 };
    var newObj = update(obj, { b: { $apply: function (x) { return x * 2; } } });
    var newObj2 = update(obj, { b: { $set: obj.b * 2 } });
    var objShallow = { a: 5, b: 3 };
    var newObjShallow = update(obj, { $merge: { b: 6, c: 7 } });
}
//# sourceMappingURL=react-tests.js.map