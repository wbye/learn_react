/**
 * Created by ywbshiwo on 15/11/26.
 */
"use strict";

var MyFormBox = React.createClass({
    displayName: "MyFormBox",

    sayHellp: function sayHellp() {
        return console.log("hello");
    },
    render: function render() {
        return React.createElement(
            "form",
            null,
            React.createElement(
                "div",
                null,
                'my form 2'
            )
        );
    }
});

ReactDOM.render(React.createElement(MyFormBox, null), document.getElementById("user-dialog"));