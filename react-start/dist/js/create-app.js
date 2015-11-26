/**
 * Created by ywbshiwo on 15/11/26.
 */

"use strict";

var CreateStepContainer = React.createClass({
    displayName: "CreateStepContainer",

    getInitialState: function getInitialState() {
        //Minimization state
        return {
            status: {
                name: "disabled",
                content: "disabled",
                create: "disabled"
            }
        };
    },
    setStepStatusBySign: function setStepStatusBySign(currentStatus) {
        //order steps
        var steps = ['name', 'content', 'create'];
        var statusMap = {
            //三个值 disabled complete active
            name: "disabled",
            content: "disabled",
            create: "disabled"
        };
        var index = _.indexOf(steps, currentStatus);

        if (index !== -1) {
            if (index === 0) {
                statusMap['name'] = 'active';
                statusMap['content'] = 'disabled';
                statusMap['create'] = 'disabled';
            } else if (index === 1) {
                statusMap['name'] = 'completed';
                statusMap['content'] = 'active';
                statusMap['create'] = 'disabled';
            } else if (index === 2) {
                statusMap['name'] = 'completed';
                statusMap['content'] = 'completed';
                statusMap['create'] = 'active';
            }

            this.setState({ status: statusMap });
        } else {
            new Error("unkonw create step status " + currentStatus);
        }
    },
    selectStep: function selectStep(e) {
        debugger;
    },
    componentDidMount: function componentDidMount() {
        //ajax 请求 get status
        this.setStepStatusBySign('content');
    },
    render: function render() {
        console.log(2);
        //render 里面调setState 导致死循环
        return React.createElement(
            "div",
            { className: "ui  three ordered steps" },
            React.createElement(CreateStep, { title: "名称", step: "name", status: this.state.status.name, onClick: this.selectStep }),
            React.createElement(CreateStep, { title: "内容", step: "content", status: this.state.status.content, onClick: this.selectStep }),
            React.createElement(CreateStep, { title: "创建", step: "create", status: this.state.status.create, onClick: this.selectStep })
        );
    }
});

var CreateStep = React.createClass({
    displayName: "CreateStep",

    test: function test(e) {
        debugger;
    },
    render: function render() {
        var status = this.props.status || '';
        var title = this.props.title || '';

        return React.createElement(
            "div",
            { className: status + " step", onClick: this.test },
            React.createElement(
                "div",
                { className: "content" },
                React.createElement(
                    "div",
                    { className: "title" },
                    title
                )
            )
        );
    }
});

//
ReactDOM.render(React.createElement(CreateStepContainer, null), document.getElementById("create-step"));