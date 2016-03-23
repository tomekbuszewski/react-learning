const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');
const app = document.getElementById('app');

import Firebase from 'Firebase';
const server = new Firebase('https://tomekbuszewski.firebaseio.com/');

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      loadingClass: true,
			name: null,
      address: null
    };
  },

  componentDidMount: function() {
    server.on('value', function(data) {
      const db = data.val();
      this.setState({
        loadingClass: false,
				name: db.name,
        address: db.address.city
      });
    }.bind(this));
  },

	render: function () {
    let classes = classNames({
      'container': true,
      'loading': this.state.loadingClass,
			'loaded' : !this.state.loadingClass
    });

		return (
			<div className={classes}>
				<h1>{this.state.name}</h1>
        <pre>{this.state.address}</pre>
			</div>
		)
	}
});

ReactDOM.render(<HelloWorld />, app);
