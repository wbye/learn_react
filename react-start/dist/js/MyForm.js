/**
 * Created by ywbshiwo on 15/11/26.
 */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MyFormBox = React.createClass({
    displayName: "MyFormBox",

    sayHellp: function sayHellp() {
        return console.log("hello");
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "ui form" },
            React.createElement(
                "div",
                { className: "three fields" },
                React.createElement(
                    "div",
                    { className: "field" },
                    React.createElement(
                        "label",
                        null,
                        "First name"
                    ),
                    React.createElement("input", { type: "text", placeholder: "First Name" })
                ),
                React.createElement(
                    "div",
                    { className: "field" },
                    React.createElement(
                        "label",
                        null,
                        "Middle name"
                    ),
                    React.createElement("input", { type: "text", placeholder: "Middle Name" })
                ),
                React.createElement(
                    "div",
                    { className: "field" },
                    React.createElement(
                        "label",
                        null,
                        "Last name"
                    ),
                    React.createElement("input", { type: "text", placeholder: "Last Name" })
                )
            )
        );
    }
});

var SmButton = React.createClass({
    displayName: "SmButton",

    PropTypes: {
        children: React.PropTypes.any.required
    },
    render: function render() {
        var _props = this.props;
        var children = _props.children;
        var className = _props.className;

        var other = _objectWithoutProperties(_props, ["children", "className"]);

        className = "ui button" + " " + (className || '');

        return React.createElement(
            "button",
            _extends({ className: className }, other),
            children
        );
    },
    getMyName: function getMyName() {
        console.log(this);
    }
});

var SmDropdown = React.createClass({
    displayName: "SmDropdown",

    getInitialState: function getInitialState() {
        return {
            data: []
        };
    },
    getAjaxConfig: function getAjaxConfig() {

        var ajaxConfig = _.extend({
            method: "get",
            dataType: "application/json",
            headers: {}
        }, _.omit(this.props.store, "transform"));

        return ajaxConfig;
    },
    getServerData: function getServerData(ajaxConfig) {
        var fakerData = [{
            name: "female",
            value: "-1"
        }, {
            name: "male",
            value: "1"
        }, {
            name: "unknown",
            value: "0"
        }];

        var transform = this.props.store.transform;

        $.ajax(ajaxConfig).done((function (res) {
            if (transform) res = transform(res);
            this.setState({
                data: fakerData
            });
        }).bind(this)).fail((function (res) {
            if (transform) res = transform(res);
            this.setState({
                data: fakerData
            });
        }).bind(this)).always(function () {});
    },
    componentDidMount: function componentDidMount() {
        var ajaxConfig;

        $(this._dropdown).dropdown();

        if (this.props && this.props.store) {
            if (this.props.store.url) {
                ajaxConfig = this.getAjaxConfig();
                this.getServerData(ajaxConfig);
            } else {
                new Error("dropdown prop store missing url !");
            }
        }
    },
    componentDidUpdate: function componentDidUpdate() {
        $(this._dropdown).dropdown("refresh");
    },
    render: function render() {
        var _this = this;

        var _props2 = this.props;
        var className = _props2.className;
        var search = _props2.search;
        var data = _props2.data;
        var url = _props2.url;

        var other = _objectWithoutProperties(_props2, ["className", "search", "data", "url"]);

        className = "ui search selection dropdown" + " " + (className || '');

        if (search === false) {
            className = className.replace("search", '');
        }
        data = data || [];

        return React.createElement(
            "div",
            _extends({ className: className, ref: function (c) {
                    return _this._dropdown = c;
                } }, other),
            React.createElement("input", { type: "hidden", name: "repo-ids" }),
            React.createElement(
                "div",
                { className: "default text" },
                "Select Repos"
            ),
            React.createElement("i", { className: "dropdown icon" }),
            React.createElement(
                "div",
                { className: "menu" },
                data.length !== 0 ? data.map(function (item) {
                    return React.createElement(
                        "div",
                        { className: "item", "data-value": item.value },
                        item.name
                    );
                }) : this.state.data.map(function (item) {
                    return React.createElement(
                        "div",
                        { className: "item", "data-value": item.value },
                        item.name
                    );
                })
            )
        );
    }
});

//ReactDOM.render(
//    <SmButton onClick={function() {
//     console.log("hello world");
//     console.log(SmButton.prototype);
//    }} className="primary">open dialog</SmButton>,
//    document.getElementById("user-dialog")
//);
//
//var dpData = [{
//    name: "female",
//    value: "-1"
//}, {
//    name: "male",
//    value: "1"
//}];
//
//ReactDOM.render(
//    <div><SmDropdown search={false} data={dpData} className="fluid"></SmDropdown><SmDropdown store={{url:"xxxx"}}></SmDropdown></div>,
//    document.getElementById("my-dropdowns")
//);