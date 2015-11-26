/**
 * Created by ywbshiwo on 15/11/26.
 */

var CreateStepContainer = React.createClass({
    getInitialState: function () {
        //Minimization state
        return {
            status:{
                name:"disabled",
                content:"disabled",
                create:"disabled"
            }
        }
    },
    setStepStatusBySign: function (currentStatus) {
        //order steps
        var steps = ['name','content','create'];
        var statusMap = {
            //三个值 disabled complete active
            name:"disabled",
            content:"disabled",
            create:"disabled"
        };
        var index = _.indexOf(steps,currentStatus);

        if(index!==-1){
            if(index===0){
                 statusMap['name'] = 'active';
                 statusMap['content'] = 'disabled';
                 statusMap['create'] = 'disabled';
            }else if(index===1){
                statusMap['name'] = 'completed';
                statusMap['content'] = 'active';
                statusMap['create'] = 'disabled';
            }else if(index===2){
                statusMap['name'] = 'completed';
                statusMap['content'] = 'completed';
                statusMap['create'] = 'active';
            }

            this.setState({ status:statusMap });
        }else{
            new Error("unkonw create step status "+currentStatus);
        }
    },
    selectStep: function (e) {
        debugger
    },
    componentDidMount: function () {
        //ajax 请求 get status
        this.setStepStatusBySign('content');
    },
    render: function () {
        console.log(2);
        //render 里面调setState 导致死循环
        return (
            <div className="ui  three ordered steps">
                <CreateStep title="名称" step="name" status={this.state.status.name} onClick={this.selectStep}></CreateStep>
                <CreateStep title="内容" step="content" status={this.state.status.content} onClick={this.selectStep}></CreateStep>
                <CreateStep title="创建" step="create" status={this.state.status.create} onClick={this.selectStep}></CreateStep>
            </div>
        );
    }
});

var  CreateStep = React.createClass({
    test: function (e) {
        debugger
    },
    render: function () {
        var status = this.props.status||'';
        var title = this.props.title||'';

        return (
            <div className={status+" step"} onClick={this.test}>
                <div className="content">
                    <div className="title">{title}</div>
                </div>
            </div>
        );
    }
});

//
ReactDOM.render(
    <CreateStepContainer></CreateStepContainer>,
    document.getElementById("create-step")
)