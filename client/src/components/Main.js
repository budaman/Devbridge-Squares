import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Squares from './Squares'
import SaveList from './SaveList'
import LoadCoord from './LoadCoord'
import DeleteList from './DeleteList'
import Counting from './Counting'


class Main extends Component {
  state = {
    xValue: "",
    yValue: "",
    alert: false,
    coord: [],
    loadCoord: [],
    correctType: true,
    popUpSort: false,
    popUpDisplay: false,
    currentPage: 1,
    todosPerPage: 5,
    duplicate: false,
    uplCoord: [],
    squares: [],
    squaresOn: false,
    saveList: false,
    loadList: false,
    deleteList: false
  }

//getting coords from mongo
  componentDidMount() {
    fetch('/users')
       .then(res => res.json())
       .then(coord => this.setState({ loadCoord: coord }));
  }

//getting uploaded coords
  getUplCoord = (coord) => {
     this.setState({
       coord: coord
     })
  }

//downloading file
  downloadTxtFile = () => {
    let element = document.createElement("a");
    let output = ''
    this.state.coord.forEach((item) => {
      output += item.x + ' ' + item.y + '\r\n'
    });

    let file = new Blob([
      output], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "listOfpoints.txt";
    element.click();
  }


//counting squares
  countSquares = () =>{
    let coord = this.state.coord
    let squares = []
    this.setState({
      squares: squares,
      squaresOn: true
    })

    for (let i =0; i<coord.length; i++) {
      var duplicate = false
      coord.forEach(co=>{
        if(coord[i].y === co.y && coord[i].id !== co.id) {
          let p1 = coord[i]
          let p2 = co
          let p3 = []
          for(let i =0; i<coord.length; i++) {
            coord.forEach(co=>{
              let dis = p1.x - p2.x
              if(p2.x === co.x && (p2.y + dis === co.y || p2.y - dis === co.y) && p2.id !== co.id) {
                p3 = co
                for(let i =0; i<coord.length; i++) {
                  coord.forEach(co=>{
                    if(p3.y === co.y && p1.x === co.x && p3.id !== p1.id) {
                      let makeInt = (p)=>{
                        p = parseInt(p,10)
                        if (p===0) {
                          return 1
                        } else {
                          return p
                        }
                      }
                      p1.id = makeInt(p1.id)
                      p2.id = makeInt(p2.id)
                      p3.id = makeInt(p3.id)
                      co.id = makeInt(co.id)
                    let  id = p1.id * p2.id * p3.id * co.id
                      let obj = {}
                      obj = {
                        p1: p1,
                        p2: p2,
                        p3: p3,
                        p4: co,
                        id: id
                      }
                      squares.forEach(sq=>{
                       if(sq.id  === obj.id ) {
                         duplicate = true
                         return
                       }
                      })
                      if(duplicate) {
                        return
                      }
                      squares.push(obj)
                    }
                  })
                  return
                }
                return
              }
            })
            return
          }
          return
        }
        return
      })
    }
  }
//opening squares page
  handleClose = (onClose)=> {
    this.setState({
      squaresOn: onClose
    })
  }

//validating input value
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
               let newState = {};
               newState[id + 'Value'] = value
               return newState
            })
        }
        else {
          this.setState({correctType: false})
          this.setState(()=>{
                   let newState = {};
                   newState[id + 'Value'] = ""
                   return newState
                })
        }
  }
//submiting new coord
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

//removing point
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

  //sorting content
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

    //paginated list functions
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

//toggle of save list
  saveList = () => {
    this.setState({
      saveList: !this.state.saveList
    })
  }
//toggle of load list + loading again fromd database if any change
  loadList = () => {
    this.setState({
      loadList: !this.state.loadList
    })
    fetch('/users')
       .then(res => res.json())
       .then(coord => this.setState({ loadCoord: coord }));
  }

//checking id of picked loading item
  loadId = (id) => {
    let loadCoord = this.state.loadCoord

   let pickedCoord = loadCoord.find(co=>{
      return co.name ===id
    })

   let coord = pickedCoord.coord
    this.setState({
      coord: coord,
      loadList: !this.state.loadList
    })
  }

//toggle delete func + reloading list in any change case
  deleteList = ()=> {
    this.setState({
      deleteList: !this.state.deleteList
    })
    fetch('/users')
       .then(res => res.json())
       .then(coord => this.setState({ loadCoord: coord }));
  }

  render() {

    //importing states
    const { coord, currentPage, todosPerPage, correctType, duplicate, saveList, loadList, deleteList } = this.state

    //checking if output type is correct
    let alert = false
    let addButton = false
    let maxLimit = false;

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

    //logic of paginated list
    const indexOfLastCoord = currentPage * todosPerPage
    const indexOfFirstCoord = indexOfLastCoord- todosPerPage
    const currentCoord = coord.slice(indexOfFirstCoord, indexOfLastCoord)

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(coord.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    //logic of paginated page pages
    const renderPageNumbers = pageNumbers.map((number, i) => {
      if(currentPage-6<i && currentPage+4> i) {
        return (
          <li
            key={i}
            className={(currentPage === number ? "current-page" : "")}
            id={number}
            onClick={this.handlePageId}
          >
            {number}
          </li>
        )
      }
    })
    //renering list logic
    const list = currentCoord.map((list,id)=>{
      return (
        <li key={list.id} className="listCont">
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
          {(coord.length>0) && <Counting coord={coord.length} /> }
          <div className="input-field">
          <label htmlFor="x"> X: </label>
          <input
            id="x"
            type="number"
            placeholder="x coordinate"
            onChange={this.handleChange}
            value={this.state.xValue}
          />
            <label htmlFor="y"> Y: </label>
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
            <div className={"sort-x " + (this.state.popUpSort ? 'sort-x-active' : "")} >
              <div id="xSort" onClick={this.handleSort}>X</div>
              <div id="ySort" onClick={this.handleSort}>Y</div>
            </div>
            <div>Sort By</div>
          </div>
          <div
            className="sort"
            id="display"
            onClick={this.popUpSort}
            >Display </div>
            <div className={"display " + (this.state.popUpDisplay  ? 'display-active' : "") }>
              <div id="5" onClick={this.handleDisplay}>5</div>
              <div id="10" onClick={this.handleDisplay}>10</div>
              <div id="20" onClick={this.handleDisplay}>20</div>
              <div id="50" onClick={this.handleDisplay}>50</div>
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
      <Sidebar getUplCoord={this.getUplCoord}
              downloadTxtFile={this.downloadTxtFile}
              countSquares={this.countSquares}
              saveList={this.saveList}
              loadList={this.loadList}
              deleteList={this.deleteList}

             />
      <Squares
        squaresOn={this.state.squaresOn}
        squares={this.state.squares}
        handleClose={this.handleClose}
       />
      { saveList && <SaveList
        saveList={this.saveList}
        coord={this.state.coord}
      />}
      { loadList && <LoadCoord
        loadList={this.loadList}
        loadCoord={this.state.loadCoord}
        loadId={this.loadId}
      /> }
      { deleteList && <DeleteList
        loadCoord={this.state.loadCoord}
        deleteList={this.deleteList}
      />}
      </div>
    );
  }
}

export default Main;
