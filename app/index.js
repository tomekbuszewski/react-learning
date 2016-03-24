import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'Firebase';

const classNames = require('classnames');
const app = document.getElementById('app');

class NewWorld extends React.Component {
  constructor(props) {
    super(props);
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

// ReactDOM.render(<HelloWorld />, app);

// Fiche
//---------------------------------------------------
const fiche = document.getElementById('fiche');
const ficheServer = new Firebase('https://intense-torch-9229.firebaseio.com/');

class Fiche extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      words: 0,
      random: 0,
      data: null,
      wordPl: null,
      wordEn: null,
      answer: null
    }
  }

  componentDidMount() {
    ficheServer.on('value', (data) => {
      const ficheData = data.val();

      this.setState({
        words: ficheData.length,
        data: ficheData
      }, this.getRandomNumber);
    });
  }

  getRandomNumber() {
    let random = Math.floor(Math.random() * (this.state.words - 1) + 1);

    this.setState({
      random: random
    }, this.setWords);
  }

  setWords() {
    this.setState({
      wordEn: this.state.data[this.state.random].en,
      wordPl: this.state.data[this.state.random].pl
    })
  }

  checkWord(event) {
    let answer = event.target.value;
    if(answer === this.state.wordPl) {
      this.getRandomNumber();
    }
  }

  render() {
    return (
      <section className="container">
        <p>Słów w bazie: {this.state.words}</p>
        <p>
          <strong>{this.state.wordEn}</strong> to po polsku
          <input value={this.state.answer} type="text" name="ficheText" onChange={this.checkWord.bind(this)} />
        </p>
        <button onClick={this.getRandomNumber.bind(this)}>Przeładuj</button>
      </section>
    )
  }
};

ReactDOM.render(<Fiche />, fiche);
