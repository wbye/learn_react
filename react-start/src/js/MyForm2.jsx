/**
 * Created by ywbshiwo on 15/11/26.
 */
var MyFormBox = React.createClass({
    sayHellp:()=>(console.log("hello")),
    render: function () {
        return (
            <form><div>{'my form 2'}</div></form>
        );
    }
});

ReactDOM.render(
    <MyFormBox></MyFormBox>,
    document.getElementById("user-dialog")
);