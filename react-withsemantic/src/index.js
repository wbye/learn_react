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
    getInitialState: function () {
        return {
            data:[]
        };
    },
    loadCommentFromServer: function () {
        $.getJSON(this.props.url)
            .done(function (data) {
                this.setState({
                    data:data
                });
            }.bind(this)).fail(function () {

            });
    },
    handleCommentSubmit: function (comment) {
        //todo submit to the server and refresh the lis
        $.ajax({
            url:this.props.url,
            dataType:"json",
            type:"post",
            data:comment,
            success: function () {

            }.bind(this),
            error: function () {
                var data = this.state.data.concat([comment]);
                this.setState({
                    data:data
                });
            }.bind(this)
        })
    },
    //真实DOM被插入后执行
    componentDidMount: function () {
        this.loadCommentFromServer();
        //setInterval(this.loadCommentFromServer,this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <CommentListItem author={comment.author} key={comment.id}>{comment.text}</CommentListItem>
            );
        });

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

//This is a special API that intentionally makes it difficult to insert raw HTML,
// but for marked we'll take advantage of this backdoor.

//Remember: by using this feature you're relying on marked to be secure.
// In this case, we pass sanitize: true which tells marked to
// escape any HTML markup in the source instead of passing it through unchanged.
var CommentListItem = React.createClass({
    rawMarkup: function () {
        var rawMarkup = marked(this.props.children.toString(),{ snaitize:true});

        return {__html:rawMarkup};
    },
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
        );
    }
});

//注意事件和取值的写法
var CommentForm = React.createClass({
    getInitialState: function () {
        return {author:'',text:''};
    },
    handleAuthorChange: function (e) {
      this.setState({author:e.target.value});
    },
    handleTextChange:function(e){
        this.setState({text:e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();

        if(!author||!text){
            return ;
        }
        // send data to server
        this.props.onCommentSubmit({
            author:author,
            text:text
        });
        this.setState({
            author:'',
            text:''
        });
    },
    render: function () {
        console.log("222");
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <div><input type="text" value={this.state.author} placeholder="Your name" onChange={this.handleAuthorChange}  /></div>
                <div><input type="text" value={this.state.text} placeholder="Say something" onChange={this.handleTextChange} /></div>
                <input type="submit" value="post" />
            </form>
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
    <CommentBox url ="/api/data.json" pollInterval={2000} />,
    document.getElementById("content")
);

