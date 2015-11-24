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
var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                Hello, world! I am a CommentList.
                <CommentListItem />
                <CommentListItem />
            </div>
        );
    }
});

var CommentListItem = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm"> Hello, world! I am a CommentFrom.</div>
        )
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
    <CommentBox />,
    document.getElementById("content")
);

