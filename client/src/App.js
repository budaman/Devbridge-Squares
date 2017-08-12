import React, { Component } from 'react'
import Input from './components/Input'
import Title from './components/Title'
import Sidebar from './components/Sidebar'
import './App.css'

class App extends Component {
  state = {
    uplCoord: []
  }

  getUplCoord = (coord) => {
     this.setState({
       uplCoord: coord
     })
  }



click = ()=>{
}

  render() {
    return (
      <div onClick={this.click} className="App">
        <Title />
        <Input sendUpload={this.state.uplCoord}/>
        <Sidebar getUplCoord={this.getUplCoord} />
      </div>
    );
  }
}

export default App
