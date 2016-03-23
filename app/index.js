const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');
import Firebase from 'Firebase';
const app = document.getElementById('app');

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      database: null,
      loadingClass: true,
			name: null
    };
  },

  componentDidMount: function() {
    var serverRequest = new Firebase('https://tomekbuszewski.firebaseio.com/');
    serverRequest.on('value', function(data) {
      this.setState({
        database: data.val(),
        loadingClass: false,
				name: data.val().name
      });
    }.bind(this));
  },

	render: function () {
    console.log(this.state.database);
    let classes = classNames({
      'container': true,
      'loading': this.state.loadingClass,
			'loaded' : !this.state.loadingClass
    });

		return (
			<div className={classes}>
				<h1>{this.state.name}</h1>
			</div>
		)
	}
});

ReactDOM.render(<HelloWorld />, app);
