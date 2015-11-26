/**
 * Created by ywbshiwo on 15/11/25.
 */
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HelloReact = React.createClass({
    displayName: "HelloReact",

    render: function render() {
        //这里返回的是  virtucal DOM
        return React.createElement(
            "div",
            { "data-test": "78" },
            "hello,",
            React.createElement("input", { type: "text", placeholder: "your name here" }),
            "! It is ",
            this.props.date.toString()
        );
    }
});

//The way we are able to figure this out is that React does not manipulate the DOM unless it needs to.
// It uses a fast, internal mock DOM to perform diffs and computes the most efficient DOM mutation for you.

setInterval(function () {
    ReactDOM.render(React.createElement(HelloReact, { date: new Date() }), document.getElementById("example-1"));
}, 500);

//Components
//You can think of them as simple functions that take in props and state (discussed later) and render HTML.
// With this in mind, components are easy to reason about.
//We strongly believe that components are the right way to separate concerns rather than "templates" and "display logic."
//JSX lets you create JavaScript objects using HTML syntax.

//To generate a link in React using pure JavaScript you'd write:

//React.createElement('a', {href: 'https://facebook.github.io/react/'}, 'Hello!')

//With JSX this becomes:

//<a href="https://facebook.github.io/react/">Hello!</a>

//JSX will infer the class's displayName from the variable assignment when the displayName is undefined:

//Namespaced Components

//var Form = MyFormComponent;
//
//var App = (
//    <Form>
//        <Form.Row>
//            <Form.Label />
//            <Form.Input />
//        </Form.Row>
//    </Form>
//);

//var MyFormComponent = React.createClass({ ... });
//
//MyFormComponent.Row = React.createClass({ ... });
//MyFormComponent.Label = React.createClass({ ... });
//MyFormComponent.Input = React.createClass({ ... });

//javascript Expressions

//attributes expressions
//To use a JavaScript expression as an attribute value,
//wrap the expression in a pair of curly braces ({}) instead of quotes ("").

//Boolean Attributes
//Omitting the value of an attribute causes JSX to treat it as true.
//    To pass false an attribute expression must be used.
//    This often comes up when using HTML form elements,
// with attributes like disabled, required, checked and readOnly.

// These two are equivalent in JSX for disabling a button
//<input type="button" disabled />;
//<input type="button" disabled={true} />;

// And these two are equivalent in JSX for not disabling a button
//<input type="button" />;
//<input type="button" disabled={false} />;

//Child Expressions
// Input (JSX):
//var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
//// Output (JS):
//var content = React.createElement(
//    Container,
//    null,
//    window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
//);

//JSX is similar to HTML, but not exactly the same. See JSX gotchas for some key differences.

//JSX Spread Attributes
//扩展的属性

//Mutatuin Props is Bad
//var component = <Component />;
//component.props.foo = x; // bad
//component.props.bar = y; // also bad

//The props should be considered immutable

//spread  attribute
//var props = {};
//props.foo = x;
//props.bar = y;
//var component = <Component {...props} />;
// Later attributes override previous ones.

//var props = { foo: 'default' };
//var component = <Component {...props} foo={'override'} />;
//console.log(component.props.foo); // 'override'
//The ... operator (or spread operator) is already supported for arrays in ES6.
//There is also an ES7 proposal for Object Rest and Spread Properties.
// We're taking advantage of these supported and developing standards in order to provide a cleaner syntax in JSX.

//JSX Gotchas
//React escapes all the strings you are displaying in order to prevent a wide range of XSS attacks by default.

//If you pass properties to native HTML elements that
// do not exist in the HTML specification,
// React will not render them.
//If you want to use a custom attribute, you should prefix it with data-.

//Event delegation: React doesn't actually attach event handlers to the nodes themselves.

//Components are Just State Machines
//What Components Should Have State?
//Most of your components should simply take some data from props and render it.
//However, sometimes you need to respond to user input,
//a server request or the passage of time. For this you use state.
//Try to keep as many of your components as possible stateless.

//A common pattern is
// to create several stateless components that just render data,
// and have a stateful component above them in the hierarchy
// that passes its state to its children via props.
// The stateful component encapsulates all of the interaction logic,
// while the stateless components take care of rendering data in a declarative way.
// 就是我刚才想到的，同时也是那个评论里面的逻辑

//State should contain data that a component's event handlers may change to trigger a UI update.
//In real apps this data tends to be very small and JSON-serializable.
//When building a stateful component, think about the minimal possible representation of its state,
//and only store those properties in this.state.

//this.state should only contain the minimal amount of data needed to represent your UI's state.
//As such, it should not contain:
//Computed data: Don't worry about precomputing values based on state — it's easier to ensure that your UI is consistent if you do all computation within render(). For example, if you have an array of list items in state and you want to render the count as a string, simply render this.state.listItems.length + ' list items' in your render() method rather than storing it on state.
//React components: Build them in render() based on underlying props and state.
//Duplicated data from props: Try to use props as the source of truth where possible. One valid use to store props in state is to be able to know its previous values, because props may change as the result of a parent component re-rendering.

//最小化 state
//只放数据， 不放什么计算数据的值，React 组件，以及从props复制的值
// 当然如果确实需要放进去，上面的法则可以打破，
//只能是 尽量最小化state

//In React, an owner is the component that sets the props of other components.
//The owner-ownee relationship is specific to React, while the parent-child relationship is simply the one you know and love from the DOM.

//When React reconciles the keyed children, it will ensure that any child with key will be reordered (instead of clobbered) or destroyed (instead of reused).

//The key should always be supplied directly to the components in the array, not to the container HTML child of each component in the array:
//directly to the components in the array

//Note that for performance reasons propTypes is only checked in development mode.

var CheckLink = React.createClass({
    displayName: "CheckLink",

    render: function render() {
        return React.createElement(
            "a",
            this.props,
            '√',
            this.props.children
        );
    }
});

//...this.props for short
ReactDOM.render(React.createElement(
    CheckLink,
    { href: "/checeked.html", target: "_blank" },
    "Click here!"
), document.getElementById("example-2"));

var MyComponent = React.createClass({
    displayName: "MyComponent",

    propTypes: {
        //children: React.PropTypes.element.isRequired,
        test: React.PropTypes.number
    },
    render: function render() {
        return(
            //This must be exactly one element or it will throw error
            React.createElement(
                "div",
                null,
                this.props.children
            )
        );
    }
});

ReactDOM.render(React.createElement(
    MyComponent,
    null,
    React.createElement(
        "h1",
        null,
        "hello,world"
    )
), document.getElementById("example-3"));

ReactDOM.render(React.createElement(
    MyComponent,
    { test: 'p' },
    'hello world'
), document.getElementById("example-4"));

var SetIntervalMixin = {
    componentWillMount: function componentWillMount() {
        this.intervals = [];
    },
    setInterval: (function (_setInterval) {
        function setInterval() {
            return _setInterval.apply(this, arguments);
        }

        setInterval.toString = function () {
            return _setInterval.toString();
        };

        return setInterval;
    })(function () {
        this.intervals.push(setInterval.apply(null, arguments));
    }),
    componentWillUnmount: function componentWillUnmount() {
        this.intervals.forEach(clearInter());
    }
};

var TickTock = React.createClass({
    displayName: "TickTock",

    mixins: [SetIntervalMixin], //use the mixin
    getInitialState: function getInitialState() {
        return { seconds: 0 };
    },
    componentDidMount: function componentDidMount() {
        this.setInterval(this.tick, 1000); //call mixin function
    },
    tick: function tick() {
        this.setState({ seconds: this.state.seconds + 1 });
    },
    render: function render() {
        return React.createElement(
            "p",
            null,
            "React has been running for ",
            this.state.seconds,
            " seconds"
        );
    }
});

ReactDOM.render(React.createElement(TickTock, null), document.getElementById("example-5"));

var HelloMessage = (function (_React$Component) {
    _inherits(HelloMessage, _React$Component);

    function HelloMessage() {
        _classCallCheck(this, HelloMessage);

        _get(Object.getPrototypeOf(HelloMessage.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HelloMessage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                "Hello ",
                this.props.name
            );
        }
    }]);

    return HelloMessage;
})(React.Component);

ReactDOM.render(React.createElement(HelloMessage, { name: "world" }), document.getElementById("example-6"));

//The API is similar to React.createClass with the exception of getInitialState.
//Instead of providing a separate getInitialState method, you set up your own state property in the constructor.

//export class Counter extends React.component{
//    constructor(props){
//        super(props);
//        this.state = {count:props.initialCount};
//    }
//    tick(){
//        this.setState({count:this.state.count+1});
//    }
//    render(){
//        return (
//            <div onClick={this.tick.bind(this)}>
//                Clicks:{this.state.count}
//            </div>
//        )
//    }
//}
//
//Counter.propTypes = {initialCount:React.PropTypes.number};
//Counter.defaultProps = {initialCount:0};
//
//ReactDOM.render(
//    <Counter></Counter>,
//    document.getElementById("example-7")
//)
//exports is not supported in the browser, you need a commonjs environment such as node.js/io.js, browserify/webpack etc

//Stateless Functions

function HelloMessage_2(props) {
    return React.createElement(
        "div",
        null,
        "Hello ",
        props.name
    );
}

ReactDOM.render(React.createElement(HelloMessage_2, { name: "world2" }), document.getElementById("example-8"));

var HelloMessage_3 = function HelloMessage_3(props) {
    return React.createElement(
        "div",
        null,
        "Hello ",
        props.name
    );
};
ReactDOM.render(React.createElement(HelloMessage_3, { name: "world3" }), document.getElementById("example-9"));

var FancyCheckbox = React.createClass({
    displayName: "FancyCheckbox",

    render: function render() {
        var fancyClass = this.props.checked ? 'FancyChecked' : 'FancyUnchecked';
        return React.createElement(
            "div",
            { className: fancyClass, onClick: this.props.onClick },
            this.props.children
        );
    }
});
ReactDOM.render(React.createElement(
    FancyCheckbox,
    { checked: true, onClick: console.log.bind(console) },
    "Hello world!"
), document.getElementById('example-10'));

//not support This proposal has reached stage 2 and is now enabled by default in Babel.
//Older versions of Babel may need to explicitly enable this transform with babel --optional es7.objectRestSpread
var FancyCheckbox2 = React.createClass({
    displayName: "FancyCheckbox2",

    render: function render() {
        var _props = this.props;
        var checked = _props.checked;

        var other = _objectWithoutProperties(_props, ["checked"]);

        var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
        // `other` contains { onClick: console.log } but not the checked property
        return React.createElement("div", _extends({}, other, { className: fancyClass }));
    }
});
ReactDOM.render(React.createElement(
    FancyCheckbox2,
    { checked: true, onClick: console.log.bind(console) },
    "Hello world!"
), document.getElementById('example-11'));

// Controlled Components
//An <input> with value set is a controlled component.
// In a controlled <input>, the value of the rendered element will always reflect the value prop.
//This will render an input that always has a value of Hello!.
//Any user input will have no effect on the rendered element because React has declared the value to be Hello!.
//If you wanted to update the value in response to user input, you could use the onChange event:
var ControllerInput = React.createClass({
    displayName: "ControllerInput",

    getInitialState: function getInitialState() {
        return { text: 'hello!' };
    },
    handleChange: function handleChange(e) {
        this.setState({
            text: e.target.value
        });
    },
    render: function render() {
        var value = this.state.text;
        return React.createElement("input", { value: value, type: "text", onChange: this.handleChange });
    }
});
ReactDOM.render(React.createElement(ControllerInput, null), document.getElementById("example-12"));

//An <input> that does not supply a value (or sets it to null) is an uncontrolled component.
//In an uncontrolled <input>, the value of the rendered element will reflect the user's input.
//defaultValue

var DefaultHelloInput = React.createClass({
    displayName: "DefaultHelloInput",

    render: function render() {
        return React.createElement("input", { type: "text", defaultValue: "hello" });
    }
});
ReactDOM.render(React.createElement(DefaultHelloInput, null), document.getElementById("example-13"));

var ReactSelect = React.createClass({
    displayName: "ReactSelect",

    render: function render() {
        return React.createElement(
            "select",
            { defaultValue: "B" },
            React.createElement(
                "option",
                { value: "A" },
                "Apple"
            ),
            React.createElement(
                "option",
                { value: "B" },
                "Banana"
            ),
            React.createElement(
                "option",
                { value: "C" },
                "Cranberry"
            )
        );
    }
});

ReactDOM.render(React.createElement(ReactSelect, null), document.getElementById("example-14"));

//Working with the browser

//Refs and findDOMNode()

//Component Lifecycle

//Mounting
//Updating
//Unmounting

//will did

//Mounting

// getInitialState():object is invoked before a components is mounted,
// StateFul Components should implement this and return the initial state data

// componentWillMount() is invoked immediately before mounting occurs.

// componentDiDMount() is invoked immediately before after mounting occurs.
// Initialization that requires DOM node should go here.

//Updating

//componentWillReceiveProps(object nextProps)  is invoked when a mounted
//component receives new props.This method should be used to compare this.props
//and nexProps to perform state transitions using this.setState();

//shouldComponentUpdate(object nextProps,object nextState):boolean is invoked
//when a component decides whether any changes warrant an update to the DOM.
//implement this as an optimization to compare this.props with nextProps and
//this.state with  nextState and return false if React should skip updating

//componentWillUpdate(object nextProps, object nextState) is invoked immediately before updating occurs.
//You cannot call this.setState() here.
//componentDidUpdate(object prevProps, object prevState) is invoked immediately after updating occurs.

//componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. Cleanup should go here.

//the ref Callback Attribute
//React supports a special attribute that you can attach to any component.
//The ref attribute can be a callback function,
// and this callback will be executed immediately after the component is mounted.

var FocusInput = React.createClass({
    displayName: "FocusInput",

    render: function render() {
        var _this = this;

        // arguments was DOM node
        return React.createElement("input", { ref: function (c) {
                return _this._input = c;
            } });
    },
    componentDidMount: function componentDidMount() {
        this._input.focus();
        //debugger
        console.log(this._input.getBoundingClientRect());
    },
    sayHello: function sayHello() {}
});

FocusInput.sayMuch = function () {
    console.log("say much");
};
ReactDOM.render(React.createElement(FocusInput, null), document.getElementById("example-15"));