/**
 * Created by ywbshiwo on 15/11/26.
 */

var MyFormBox = React.createClass({
    sayHellp:()=>(console.log("hello")),
    render: function () {
        return (
            <form>{'my form'}</form>
        );
    }
});

ReactDOM.render(
    <MyFormBox></MyFormBox>,
  document.getElementById("user-dialog")
);