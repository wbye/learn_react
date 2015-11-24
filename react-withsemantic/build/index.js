/**
 * Created by ywbshiwo on 15/11/24.
 */

// - commentBox
//     - commentList
//-comment
//- comnmenForm
//The <div> tags are not actual DOM nodes;
// they are instantiations of React div components.
// You can think of these as markers or pieces of data that React knows how to handle.
// React is safe.
// We are not generating HTML strings so XSS protection is the default.
"use strict";

var CommentBox = React.createClass({
    displayName: "CommentBox",

    render: function render() {
        return React.createElement(
            "div",
            { className: "commentBox" },
            React.createElement(
                "h1",
                null,
                "Comments"
            ),
            React.createElement(CommentList, null),
            React.createElement(CommentForm, null)
        );
    }
});

var CommentList = React.createClass({
    displayName: "CommentList",

    render: function render() {
        return React.createElement(
            "div",
            { className: "commentList" },
            "Hello, world! I am a CommentList.",
            React.createElement(CommentListItem, null),
            React.createElement(CommentListItem, null)
        );
    }
});

var CommentListItem = React.createClass({
    displayName: "CommentListItem",

    render: function render() {
        return React.createElement(
            "div",
            { className: "comment" },
            React.createElement(
                "h2",
                { className: "commentAuthor" },
                this.props.author
            ),
            this.props.children
        );
    }
});

var CommentForm = React.createClass({
    displayName: "CommentForm",

    render: function render() {
        return React.createElement(
            "div",
            { className: "commentForm" },
            " Hello, world! I am a CommentFrom."
        );
    }
});

//ReactDOM.render() instantiates the root component,
// starts the framework,
// and injects the markup into a raw DOM element
// , provided as the second argument.
//The ReactDOM module exposes DOM-specific methods,
// while React has the core tools shared by React on different platforms
ReactDOM.render(
//<CommentBox></CommentBox>
React.createElement(CommentBox, null), document.getElementById("content"));