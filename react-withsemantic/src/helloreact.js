/**
 * Created by ywbshiwo on 15/11/25.
 */
var HelloReact = React.createClass({
    render: function () {
        //这里返回的是  virtucal DOM
        return (
            <div data-test="78">
                hello,<input type="text" placeholder="your name here"/>!
                It is {this.props.date.toString()}
            </div>
        );
    }
});

//The way we are able to figure this out is that React does not manipulate the DOM unless it needs to.
// It uses a fast, internal mock DOM to perform diffs and computes the most efficient DOM mutation for you.

setInterval(function () {
    ReactDOM.render(
        <HelloReact date={new Date()}/>,
        document.getElementById("example-1")
    );
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
    render: function () {
        return (<a {...this.props}>{'√'} {this.props.children}</a>);
    }
});

//...this.props for short
ReactDOM.render(
    <CheckLink href="/checeked.html" target="_blank">Click here!</CheckLink>,
    document.getElementById("example-2")
);

var MyComponent = React.createClass({
    propTypes: {
        //children: React.PropTypes.element.isRequired,
        test:React.PropTypes.number
    },
    render: function () {
        return (
            //This must be exactly one element or it will throw error
            <div >{this.props.children}</div>
        );

    }
});

ReactDOM.render(
    <MyComponent ><h1>hello,world</h1></MyComponent>,
    document.getElementById("example-3")
);

ReactDOM.render(
    <MyComponent test={'p'}>{'hello world'}</MyComponent>,
    document.getElementById("example-4")
);


var SetIntervalMixin = {
    componentWillMount: function () {
        this.intervals = [];
    },
    setInterval: function () {
        this.intervals.push(setInterval.apply(null,arguments));
    },
    componentWillUnmount: function () {
        this.intervals.forEach(clearInter());
    }
};

var TickTock = React.createClass({
    mixins:[SetIntervalMixin],//use the mixin
    getInitialState: function () {
        return {seconds:0};
    },
    componentDidMount: function () {
        this.setInterval(this.tick,1000); //call mixin function
    },
    tick:function(){
        this.setState({seconds:this.state.seconds+1});
    },
    render: function () {
        return (
          <p>React has been running for {this.state.seconds} seconds</p>
        );
    }
});

ReactDOM.render(
    <TickTock />,
  document.getElementById("example-5")
);


class HelloMessage extends React.Component{
    render(){
        return <div>Hello {this.props.name}</div>
    }
}
ReactDOM.render(
    <HelloMessage name="world"></HelloMessage>,
    document.getElementById("example-6")
);

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

function HelloMessage_2(props){
    return <div>Hello {props.name}</div>;
}

ReactDOM.render(
    <HelloMessage_2 name="world2"></HelloMessage_2>,
    document.getElementById("example-8")
);


var HelloMessage_3 = (props) => <div>Hello {props.name}</div>;
ReactDOM.render(
    <HelloMessage_3 name="world3"></HelloMessage_3>,
    document.getElementById("example-9")
);


var FancyCheckbox = React.createClass({
    render: function() {
        var fancyClass = this.props.checked ? 'FancyChecked' : 'FancyUnchecked';
        return (
            <div className={fancyClass} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
});
ReactDOM.render(
    <FancyCheckbox checked={true} onClick={console.log.bind(console)}>
        Hello world!
    </FancyCheckbox>,
    document.getElementById('example-10')
);

 //not support This proposal has reached stage 2 and is now enabled by default in Babel.
 //Older versions of Babel may need to explicitly enable this transform with babel --optional es7.objectRestSpread
var FancyCheckbox2 = React.createClass({
    render: function() {
        var { checked, ...other } = this.props;
        var fancyClass = checked ? 'FancyChecked' : 'FancyUnchecked';
        // `other` contains { onClick: console.log } but not the checked property
        return (
            <div {...other} className={fancyClass} />
        );
    }
});
ReactDOM.render(
    <FancyCheckbox2 checked={true} onClick={console.log.bind(console)}>
        Hello world!
    </FancyCheckbox2>,
    document.getElementById('example-11')
);

// Controlled Components
//An <input> with value set is a controlled component.
// In a controlled <input>, the value of the rendered element will always reflect the value prop.
//This will render an input that always has a value of Hello!.
//Any user input will have no effect on the rendered element because React has declared the value to be Hello!.
//If you wanted to update the value in response to user input, you could use the onChange event:
var ControllerInput = React.createClass({
    getInitialState: function () {
        return {text:'hello!'};
    },
    handleChange: function (e) {
          this.setState({
            text:e.target.value
          });
    },
    render: function () {
        var value = this.state.text;
        return (<input value={value} type="text" onChange={this.handleChange} />);
    }
});
ReactDOM.render(
    <ControllerInput></ControllerInput>,
    document.getElementById("example-12")
);

//An <input> that does not supply a value (or sets it to null) is an uncontrolled component.
//In an uncontrolled <input>, the value of the rendered element will reflect the user's input.
//defaultValue

var DefaultHelloInput = React.createClass({
    render: function () {
        return (<input type="text" defaultValue="hello" />);
    }
});
ReactDOM.render(
    <DefaultHelloInput></DefaultHelloInput>,
    document.getElementById("example-13")
);

var ReactSelect = React.createClass({
    render: function () {
        return (
            <select defaultValue="B">
                <option value="A">Apple</option>
                <option value="B">Banana</option>
                <option value="C">Cranberry</option>
            </select>
        );
    }
});

ReactDOM.render(
    <ReactSelect></ReactSelect>,
    document.getElementById("example-14")
);

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
    render: function () {
        // arguments was DOM node
        return <input ref={(c) => this._input = c } />;
    },
    componentDidMount: function () {
        this._input.focus();
        //debugger
        console.log(this._input.getBoundingClientRect());
    },
    sayHello: function () {

    }
});

FocusInput.sayMuch = function () {
    console.log("say much");
};
ReactDOM.render(
    <FocusInput></FocusInput>,
    document.getElementById("example-15")
);