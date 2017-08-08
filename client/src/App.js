import React, { Component } from 'react'
import Input from './components/Input'
import Title from './components/Title'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <Input />
      </div>
    );
  }
}

export default App
