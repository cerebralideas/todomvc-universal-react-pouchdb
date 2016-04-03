var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var props = {
    key: 42,
    ref: "myComponent42",
    hello: "world",
    foo: 42,
    bar: true
};
var container;
var ClassicComponent = React.createClass({
    getDefaultProps: function () {
        return {
            hello: undefined,
            world: "peace",
            foo: undefined,
            bar: undefined,
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
var factory = React.createFactory(ModernComponent);
var factoryElement = factory(props);
var classicFactory = React.createFactory(ClassicComponent);
var classicFactoryElement = classicFactory(props);
var domFactory = React.createFactory("foo");
var domFactoryElement = domFactory();
var element = React.createElement(ModernComponent, props);
var classicElement = React.createElement(ClassicComponent, props);
var domElement = React.createElement("div");
var clonedElement = React.cloneElement(element, props);
var clonedClassicElement = React.cloneElement(classicElement, props);
var clonedDOMElement = React.cloneElement(domElement);
var component = ReactDOM.render(element, container);
var classicComponent = ReactDOM.render(classicElement, container);
var domComponent = ReactDOM.render(domElement, container);
var unmounted = ReactDOM.unmountComponentAtNode(container);
var notValid = React.isValidElement(props);
var isValid = React.isValidElement(element);
var domNode = ReactDOM.findDOMNode(component);
domNode = ReactDOM.findDOMNode(domNode);
var type = element.type;
var elementProps = element.props;
var key = element.key;
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
var onlyChild = React.Children.only([null, [[["Hallo"], true]], false]);
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
React.addons.createFragment({
    a: React.DOM.div(),
    b: ["a", false, React.createElement("span")]
});
React.createFactory(React.addons.CSSTransitionGroup)({
    component: React.createClass({
        render: function () { return null; }
    }),
    childFactory: function (c) { return c; },
    transitionName: "transition",
    transitionAppear: false,
    transitionEnter: true,
    transitionLeave: true
});
React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    render: function () { return React.DOM.div(null); }
});
React.addons.Perf.start();
React.addons.Perf.stop();
var measurements = React.addons.Perf.getLastMeasurements();
React.addons.Perf.printInclusive(measurements);
React.addons.Perf.printExclusive(measurements);
React.addons.Perf.printWasted(measurements);
React.addons.Perf.printDOM(measurements);
React.createClass({
    mixins: [React.addons.PureRenderMixin],
    render: function () { return React.DOM.div(null); }
});
var node;
React.addons.TestUtils.Simulate.click(node);
React.addons.TestUtils.Simulate.change(node);
React.addons.TestUtils.Simulate.keyDown(node, { key: "Enter" });
var renderer = React.addons.TestUtils.createRenderer();
renderer.render(React.createElement(Timer));
var output = renderer.getRenderOutput();
React.createFactory(React.addons.TransitionGroup)({ component: "div" });
{
    var initialArray = [1, 2, 3];
    var newArray = React.addons.update(initialArray, { $push: [4] });
    var collection = [1, 2, { a: [12, 17, 15] }];
    var newCollection = React.addons.update(collection, { 2: { a: { $splice: [[1, 1, 13, 14]] } } });
    var obj = { a: 5, b: 3 };
    var newObj = React.addons.update(obj, { b: { $apply: function (x) { return x * 2; } } });
    var newObj2 = React.addons.update(obj, { b: { $set: obj.b * 2 } });
    var objShallow = { a: 5, b: 3 };
    var newObjShallow = React.addons.update(obj, { $merge: { b: 6, c: 7 } });
}
//# sourceMappingURL=react-global-tests.js.map