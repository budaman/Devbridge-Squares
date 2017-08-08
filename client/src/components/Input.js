import React, { Component } from 'react'


class Input extends Component {
  state = {
    xValue: "",
    yValue: "",
    alert: false,
    coord: [],
    correctType: true
  }

  handleChange = (e)=> {
    let id = e.target.id
    let value
    let isItInt = true
    let isNotNaN = true

    if (e.target.value.indexOf('.') >= 0)  {
      isItInt = false
    }
    value = (parseInt(e.target.value,10))
    isNotNaN = !isNaN(value)
    if(isItInt===true && isNotNaN ===true) {
      this.setState({correctType: true})
    this.setState(()=>{
             var newState = {};
             newState[id + 'Value'] = value
             return newState
          })
        }else {
          this.setState({correctType: false})
        }
  }

  handleClick = () => {
    var coord = this.state.coord;
    coord.push({x: this.state.xValue, y: this.state.yValue, id: this.state.xValue})
    this.setState({
      coord: coord,
      xValue: "",
      yValue: ""
    })
  }

  render() {
    console.log(this.state.coord)
    let correctType = this.state.correctType
    let alert = false
    let addButton = false
    if((this.state.xValue > 5000) ||
    (this.state.xValue < -5000) ||
    (this.state.yValue > 5000) ||
    (this.state.yValue < -5000))
     {
       alert = true
     } else {
      alert = false
    }

    if(alert===false && correctType ===true &&  this.state.xValue!=="" && this.state.yValue !=="") {
      addButton = true
    }

    const list = this.state.coord.map((list,id)=>{
      return (
        <li key={list.x}>
          <span className="xCol">{"x: " + list.x}</span>
          <span className="yCol">{"y: " + list.y}</span>
          <button>delete</button>
        </li>
    )
    })
    return (
      <div className="input-cont">
          <div className="input-field">
          <label
            htmlFor="x"
          > X: </label>
          <input
            id="x"
            type="number"
            placeholder="x coordinate"
            onChange={this.handleChange}
            value={this.state.xValue}
          />
          <label
            htmlFor="y"
          > Y: </label>
          <input
            id="y"
            type="number"
            placeholder="y coordinate"
            onChange={this.handleChange}
            value={this.state.yValue}
          />

        </div>
        { (addButton) && <button
          className="add"
          onClick={this.handleClick}
          >Add</button>}
        <div >
        {(alert)  && <p className="warning">Numbers of interval shoud be between -5000 and 5000</p>}
        {(!correctType)  && <p className="warning">Coordinates should be set as an integer</p>}
        </div>
        <div className="listOfCoord">
          <ul className="ul-list">
          {list}
          </ul>
        </div>
      </div>
    );
  }
}

export default Input;
