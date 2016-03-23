const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');
import Firebase from 'Firebase';
const app = document.getElementById('app');

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      database: '',
      loadingClass: true
    };
  },

  componentDidMount: function() {
    var serverRequest = new Firebase('https://intense-torch-9229.firebaseio.com/');
    serverRequest.on('value', function(data) {
      this.setState({
        database: data.val(),
        loadingClass: false
      });
    }.bind(this));
  },

	render: function () {
    console.log(this.state.database);
    let classes = classNames({
      'container': true,
      '--loading': this.state.loadingClass
    });

		return (
			<div className={classes}>
			</div>
		)
	}
});

ReactDOM.render(<HelloWorld />, app);
