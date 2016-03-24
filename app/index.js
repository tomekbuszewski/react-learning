const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');
const app = document.getElementById('app');

import Firebase from 'Firebase';

class NewWorld extends React.Component {
  constructor() {
    super();
    this.name = 'Ewa';

    this.callByName = this.callByName.bind(this); /* Or bind directly when calling */
  }

  callByName() {
    alert(this.name);
  }

  render() {
    return (
      <div>
        <h2>Hello, {this.name}</h2>
        <button onClick={this.callByName}>Alert</button>
      </div>
    )
  }
}

var HelloWorld = React.createClass({
  getInitialState: function() {
    return {
      loadingClass: true,
			name: null,
      address: null
    };
  },

  getData: function() { /* or componentDidMount if needs to be invoked on run */
    const server = new Firebase('https://tomekbuszewski.firebaseio.com/');
    server.on('value', (data) => { /* Or normal function + binding */
      const db = data.val();
      this.setState({
        loadingClass: false,
				name: db.name,
        address: db.address.city
      });
    });
  },

  handleClick: function() {
    alert('bam');
  },

	render: function () {
    let classes = classNames({
      'container': true,
      'loading': this.state.loadingClass,
			'loaded' : !this.state.loadingClass
    });

		return (
			<div>
        <button onMouseDown={this.getData}>Get data</button>
        <div className={classes}>
  				<h1>{this.state.name}</h1>
          <pre>{this.state.address}</pre>
        </div>
        <NewWorld />
			</div>
		)
	}
});

ReactDOM.render(<HelloWorld />, app);
