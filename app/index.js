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
/* TOOD
  1. Answer to lowercase                         [x]
  2. Base of answered words                      [x]
*/
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
      answer: null,
      ficheInput: null,
      loaded: false,
      answers: new Set(),
      remaining: 0
    }
  }

  componentDidMount() {
    ficheServer.on('value', (data) => {
      const ficheData = data.val();

      this.setState({
        words: ficheData.length,
        data: ficheData,
        loaded: true,
        ficheInput: document.getElementById('ficheInput')
      }, this.getRandomNumber);

      this.disconnect();
    });
  }

  getRandomNumber() {
    let random = Math.floor(Math.random() * (this.state.words - 1) + 1);

    this.setState({
      random: random
    }, this.setWords);
  }

  setWords() {
    let random = this.state.random;
    let pl = this.state.data[random].pl.toLowerCase();
    let en = this.state.data[random].en.toLowerCase();
    let answersSize = this.state.answers.size;
    let diff = (this.state.words - answersSize - 1);

    if(diff === 0) {
      this.setState({
        answers: new Set()
      }, this.getRandomNumber);
    }

    if(this.state.answers.has(pl)) {
      this.getRandomNumber();
    } else {
      this.setState({
        wordEn: this.state.data[this.state.random].en.toLowerCase(),
        wordPl: this.state.data[this.state.random].pl.toLowerCase(),
        remaining: diff
      });
    }
  }

  checkWord(event) {
    let answer = event.target.value.toLowerCase().trim();
    if(answer === this.state.wordPl) {
      setTimeout(() => { this.success(); }, 1000);

      this.setState({
        loaded: false,
        answers: this.state.answers.add(answer)
      });
    }
  }

  success() {
    this.state.ficheInput.value = '';
    this.getRandomNumber();

    this.setState({
      loaded: true
    })
  }

  disconnect() {
    Firebase.goOffline();
  }

  render() {
    let containerClass = classNames({
      'fiche': true,
      'fiche--loaded': this.state.loaded
    });

    return (
      <section className={containerClass}>
        <p className="fiche__counter">Pozostało: {this.state.remaining}</p>
        <form className="fiche__answer-field" action="">
          <p>
            <strong className="fiche__question">{this.state.wordEn}</strong> to po polsku
          </p>
          <p>
            <input
              className="fiche__input"
              value={this.state.answer}
              type="text"
              name="ficheText"
              onChange={this.checkWord.bind(this)}
              id="ficheInput"
            />
          </p>
          <p>
            <button type="button" className="fiche__reload" onClick={this.getRandomNumber.bind(this)}>Przeładuj</button>
          </p>
        </form>
      </section>
    )
  }
};

ReactDOM.render(<Fiche />, fiche);
