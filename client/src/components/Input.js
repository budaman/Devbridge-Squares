import React, { Component } from 'react'


class Input extends Component {
  state = {
    xValue: "",
    yValue: "",
    alert: false,
    coord: [],
    correctType: true,
    popUpSort: false,
    popUpDisplay: false,
    currentPage: 1,
    todosPerPage: 5,
    duplicate: false
  }

  handleChange = (e)=> {
    let id = e.target.id
    let value
    let isItInt = true
    let isNotNaN = true

    this.setState({duplicate: false})

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
        }
        else {
          this.setState({correctType: false})
          this.setState(()=>{
                   var newState = {};
                   newState[id + 'Value'] = ""
                   return newState
                })
        }
  }

  handleClick = () => {
    let coord = this.state.coord;
    let id = this.state.xValue + "" + this.state.yValue
    let duplicate = false;
    duplicate = coord.find((co)=>{
      return co.id === id
    })
    if(duplicate !== undefined) {
      this.setState({
        duplicate: true
      })
      return
    }
    coord.push({x: this.state.xValue, y: this.state.yValue, id: id})
    this.setState({
      coord: coord,
      xValue: "",
      yValue: ""
    })

  }

  handleRemove = (id) => {
    let coord = this.state.coord
    let i = coord.find(list => {
      return list.id === id
    })
    i = coord.indexOf(i)
    coord.splice(i, 1)
    this.setState({
      coord: coord
    })
  }

  componentDidUpdate () {

  }


  popUpSort = (e) => {

    if(e.currentTarget.id === 'sort')
    {
    this.setState({popUpSort:!this.state.popUpSort})

    }
    if(e.currentTarget.id === 'display') {
      this.setState({popUpDisplay: !this.state.popUpDisplay})
    }

  }

  handleSort = (e) => {
    if(e.currentTarget.id==='xSort') {
      let sort = this.state.coord
      sort.sort((a, b) =>  (a.x > b.x ? 1 : -1))
      }

      if(e.currentTarget.id==="ySort") {
        let sort = this.state.coord
        sort.sort((a, b) =>  (a.y > b.y ? 1 : -1))
        }
    }

    handlePageId = (e) => {
    let number = (parseInt(e.currentTarget.id,10))
      this.setState({currentPage: number})
    }

    handleDisplay = (e) => {
      let display = e.currentTarget.id
      this.setState({
        todosPerPage: display,
        currentPage: 1,
        popUpDisplay: false
      })
    }

    componentWillReceiveProps(props)
{
      if(props.sendUpload.length>0) {
        this.setState({
          coord: props.sendUpload
        })

      // } else  {
      //   this.setState({
      //     coord: []
      //   })
      }
    }

  render() {

    //checking if output type is correct
    let correctType = this.state.correctType
    let alert = false
    let addButton = false
    let duplicate = this.state.duplicate
    let maxLimit = false;

    //logic of paginated list
    const { coord, currentPage, todosPerPage } = this.state
    const indexOfLastCoord = currentPage * todosPerPage
    const indexOfFirstCoord = indexOfLastCoord- todosPerPage

    const currentCoord = coord.slice(indexOfFirstCoord, indexOfLastCoord)

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(coord.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number, i) => {

      if(currentPage-6<i && currentPage+4> i) {
        return (
          <li
            key={number}
            className={(currentPage === number ? "current-page" : "")}
            id={number}
            onClick={this.handlePageId}
          >
            {number}
          </li>
        )
      }

    });

    if((Math.abs(this.state.xValue) > 5000) ||
    (Math.abs(this.state.yValue) > 5000) )
     {
       alert = true
     } else {
      alert = false
    }

    if(coord.length > 9999) {
      maxLimit = true;
    }

    if(alert===false && correctType ===true &&  this.state.xValue!=="" && this.state.yValue !=="" && maxLimit ===false) {
      addButton = true
    }

    let startList = false

    if(this.state.coord.length > 0) {
      startList = true
    }



    const list = currentCoord.map((list,id)=>{
      return (
        <li
          key={list.id}
          className="listCont"
          >
          <span className="Col">{"x: " + list.x}</span>
          <span className="Col">{"y: " + list.y}</span>
          <button
            onClick={()=> {
                this.handleRemove(list.id)
            }}
            className="remove">remove</button>
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
        <div>
        {(alert)  && <p className="warning">Interval of numbers shoud be in between -5000 and 5000</p>}
        {(!correctType)  && <p className="warning">Coordinates should be set as an integer</p>}
          {(duplicate)  && <p className="warning">Duplicate points are not allowed</p>}
          {(maxLimit)  && <p className="warning">Limit of points is 10 000</p>}
        </div>
        {(startList) &&<div className="listOfCoord">
          <div className="handleList">
          <div
            className="sort"
            id="sort"
            onClick={this.popUpSort}
            >
            <div
              className={"sort-x " + (this.state.popUpSort ? 'sort-x-active' : "")} >
              <div
                id="xSort"
                onClick={this.handleSort}  >
                X</div>
              <div
                id="ySort"
                onClick={this.handleSort}>
                Y</div>
            </div>
            <div
              >
            Sort By
            </div>
          </div>
          <div
            className="sort"
            id="display"
            onClick={this.popUpSort}
            >Display </div>
            <div

              className={"display " + (this.state.popUpDisplay  ? 'display-active' : "") }
              >
              <div
                id="5"
                onClick={this.handleDisplay}
                >5</div>
              <div
                id="10"
                onClick={this.handleDisplay}
                >10</div>
              <div
                id="20"
                onClick={this.handleDisplay}
                >20</div>
              <div
                id="50"
                onClick={this.handleDisplay}
                >50</div>
             </div>
          </div>
          <ul className="ul-list">
          {list}
          </ul>
          <ul id="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
      }
      </div>
    );
  }
}

export default Input;
