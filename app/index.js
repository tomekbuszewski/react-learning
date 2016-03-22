const React = require('react');
const ReactDOM = require('react-dom');
const app = document.getElementById('app');

class Friends {
	constructor() {
		this.friends = [ 'One', 'Two', 'Three' ];
	}
}

var HelloWorld = React.createClass({
	getInitialState: function() {
		return { value: 'Hello!' };
	},
	handleChange: function(event) {
		this.setState(
			{ value: event.target.value }
		);
	},
	render: function () {
		const friends = new Friends();
		const friendlist = friends.friends;
		return (
			<div className="container">
				<label htmlFor="name">Enter your name: </label>
			  <input type="text" id="name" value={this.state.value} onChange={this.handleChange} />
				<strong>{this.state.value}</strong>
				<ShowList names={ friendlist } />
			</div>
		)
	}
});

var ShowList = React.createClass({
	render: function() {
		const listItems = this.props.names.map((friend) => {
			return (<li>{friend}</li>);
		});
		return (
			<div>
				<h3>List</h3>
				<ul>
					{ listItems }
				</ul>
			</div>
		)
	}
});

ReactDOM.render(<HelloWorld />, app);
