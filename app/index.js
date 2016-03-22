const React = require('react');
const ReactDOM = require('react-dom');
import Firebase from 'Firebase';
const app = document.getElementById('app');

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      database: ''
    };
  },

  componentDidMount: function() {
    var serverRequest = new Firebase('https://intense-torch-9229.firebaseio.com/');
    serverRequest.on('value', function(data) {
      this.setState({
        database: data.val()
      });
    }.bind(this));
  },

	render: function () {
    console.log(this.state.database);
		return (
			<div className="container">

			</div>
		)
	}
});

ReactDOM.render(<HelloWorld />, app);
