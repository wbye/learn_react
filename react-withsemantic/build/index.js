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

    getInitialState: function getInitialState() {
        return {
            data: []
        };
    },
    loadCommentFromServer: function loadCommentFromServer() {
        $.getJSON(this.props.url).done((function (data) {
            this.setState({
                data: data
            });
        }).bind(this)).fail(function () {});
    },
    handleCommentSubmit: function handleCommentSubmit(comment) {
        //todo submit to the server and refresh the lis
        $.ajax({
            url: this.props.url,
            dataType: "json",
            type: "post",
            data: comment,
            success: (function () {}).bind(this),
            error: (function () {
                var data = this.state.data.concat([comment]);
                this.setState({
                    data: data
                });
            }).bind(this)
        });
    },
    //真实DOM被插入后执行
    componentDidMount: function componentDidMount() {
        this.loadCommentFromServer();
        //setInterval(this.loadCommentFromServer,this.props.pollInterval);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "commentBox" },
            React.createElement(
                "h1",
                null,
                "Comments"
            ),
            React.createElement(CommentList, { data: this.state.data }),
            React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
        );
    }
});

var CommentList = React.createClass({
    displayName: "CommentList",

    render: function render() {
        var commentNodes = this.props.data.map(function (comment) {
            return React.createElement(
                CommentListItem,
                { author: comment.author, key: comment.id },
                comment.text
            );
        });

        return React.createElement(
            "div",
            { className: "commentList" },
            commentNodes
        );
    }
});

//This is a special API that intentionally makes it difficult to insert raw HTML,
// but for marked we'll take advantage of this backdoor.

//Remember: by using this feature you're relying on marked to be secure.
// In this case, we pass sanitize: true which tells marked to
// escape any HTML markup in the source instead of passing it through unchanged.
var CommentListItem = React.createClass({
    displayName: "CommentListItem",

    rawMarkup: function rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), { snaitize: true });

        return { __html: rawMarkup };
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "comment" },
            React.createElement(
                "h2",
                { className: "commentAuthor" },
                this.props.author
            ),
            React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() })
        );
    }
});

//注意事件和取值的写法
var CommentForm = React.createClass({
    displayName: "CommentForm",

    getInitialState: function getInitialState() {
        return { author: '', text: '' };
    },
    handleAuthorChange: function handleAuthorChange(e) {
        this.setState({ author: e.target.value });
    },
    handleTextChange: function handleTextChange(e) {
        this.setState({ text: e.target.value });
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();

        if (!author || !text) {
            return;
        }
        // send data to server
        this.props.onCommentSubmit({
            author: author,
            text: text
        });
        this.setState({
            author: '',
            text: ''
        });
    },
    render: function render() {
        console.log("222");
        return React.createElement(
            "form",
            { className: "commentForm", onSubmit: this.handleSubmit },
            React.createElement(
                "div",
                null,
                React.createElement("input", { type: "text", value: this.state.author, placeholder: "Your name", onChange: this.handleAuthorChange })
            ),
            React.createElement(
                "div",
                null,
                React.createElement("input", { type: "text", value: this.state.text, placeholder: "Say something", onChange: this.handleTextChange })
            ),
            React.createElement("input", { type: "submit", value: "post" })
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
React.createElement(CommentBox, { url: "/api/data.json", pollInterval: 2000 }), document.getElementById("content"));