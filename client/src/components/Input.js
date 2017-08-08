import React, { Component } from 'react'


class Input extends Component {
  state = {
    xValue: NaN,
    yValue: NaN,
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

    console.log(isItInt + ' ' + isNotNaN)

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

  render() {
    let correctType = this.state.correctType
    let alert = false
    if((this.state.xValue > 5000) ||
    (this.state.xValue < -5000) ||
    (this.state.yValue > 5000) ||
    (this.state.yValue < -5000))
     {
       alert = true
     } else {
      alert = false
    }
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
          />
          <label
            htmlFor="y"
          > Y: </label>
          <input
            id="y"
            type="number"
            placeholder="y coordinate"
            onChange={this.handleChange}
          />
          <button className="add">Add</button>
        </div>
        <div >
        {(alert)  && <p className="warning">Numbers of interval shoud be between -5000 and 5000</p>}
        {(!correctType)  && <p className="warning">Coordinates should be set as an integer</p>}
        </div>
      </div>
    );
  }
}

export default Input;
