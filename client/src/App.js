import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    url: '',
    link: '',
  };

  render() {
    return (
      <div className="App">
        <fieldset>
          <input
            type="text"
            name="url"
            placeholder="Enter URL including the http protocol"
          />
          <input type="submit" value="shorten" />
        </fieldset>
        <fieldset>
          <span id="result">{this.state.link}</span>
        </fieldset>
      </div>
    );
  }
}
