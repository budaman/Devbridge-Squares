import React, { Component } from 'react'
import Main from './components/Main'
import Title from './components/Title'

import './App.css'

class App extends Component {





  render() {
    return (
      <div onClick={this.click} className="App">
        <Title />
        <Main />
      </div>
    );
  }
}

export default App
