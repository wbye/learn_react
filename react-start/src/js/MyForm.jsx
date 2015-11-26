/**
 * Created by ywbshiwo on 15/11/26.
 */

var MyFormBox = React.createClass({
    sayHellp: ()=>(console.log("hello")),
    render: function () {
        return (
            <div className="ui form">
                <div className="three fields">
                    <div className="field">
                        <label>First name</label>
                        <input type="text" placeholder="First Name"/>
                    </div>

                    <div className="field">
                        <label>Middle name</label>
                        <input type="text" placeholder="Middle Name"/>
                    </div>

                    <div className="field">
                        <label>Last name</label>
                        <input type="text" placeholder="Last Name"/>
                    </div>
                </div>
            </div>
        );
    }
});

var SmButton = React.createClass({
    PropTypes: {
        children: React.PropTypes.any.required
    },
    render: function () {
        var {children,className,...other} = this.props;

        className = "ui button" + " " + (className || '');

        return (
            <button className={className} {...other}>
                {children}
            </button>
        );
    },
    getMyName: function () {
        console.log(this);
    }
})

var SmDropdown = React.createClass({
    getInitialState: function () {
        return {
            data: []
        }
    },
    getAjaxConfig: function () {

        var ajaxConfig = _.extend({
            method:"get",
            dataType:"application/json",
            headers:{

            }
        },_.omit(this.props.store,"transform"));

        return ajaxConfig;
    },
    getServerData: function (ajaxConfig) {
        var fakerData = [{
            name: "female",
            value: "-1"
        }, {
            name: "male",
            value: "1"
        },{
            name:"unknown",
            value:"0"
        }];

        var transform = this.props.store.transform;

        $.ajax(ajaxConfig).done(function (res) {
            if(transform) res = transform(res);
            this.setState({
                data:fakerData
            });
        }.bind(this)).fail(function (res) {
            if(transform) res = transform(res);
            this.setState({
                data:fakerData
            });
        }.bind(this)).always(function () {

        });
    },
    componentDidMount: function () {
        var ajaxConfig;

        $(this._dropdown).dropdown();

        if(this.props&&this.props.store){
            if(this.props.store.url){
                ajaxConfig = this.getAjaxConfig();
                this.getServerData(ajaxConfig);
            }else{
                new Error("dropdown prop store missing url !");
            }
        }

    },
    componentDidUpdate(){
        $(this._dropdown).dropdown("refresh");
    },
    render: function () {
        var {className,search,data,url,...other} = this.props;

        className = "ui search selection dropdown" + " " + (className || '');

        if (search === false) {
            className = className.replace("search", '');
        }
        data = data || [];

        return (
            <div className={className} ref={(c) => this._dropdown = c} {...other}>
                <input type="hidden" name="repo-ids"/>

                <div className="default text">Select Repos</div>
                <i className="dropdown icon"></i>

                <div className="menu">
                    {
                        data.length!==0
                            ?
                            data.map(function (item) {
                                return <div className="item" data-value={item.value}>{item.name}</div>;
                            })
                            :
                            this.state.data.map(function (item) {
                                return <div className="item" data-value={item.value}>{item.name}</div>;
                            })
                    }
                </div>
            </div>
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