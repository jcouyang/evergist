var React = require('react'),
  mui = require('material-ui'),
  RaisedButton = mui.RaisedButton;

var SomeAwesomeComponent = React.createClass({

  render: function() {
    return (
        <RaisedButton label="Default" />
    );
  }

});
React.renderComponent(
	<SomeAwesomeComponent/>, document.querySelector('#raisebutton')
)
