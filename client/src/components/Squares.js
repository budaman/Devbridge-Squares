import React, { Component } from 'react'


class Squares extends Component {


  state = {
    currentPage: 1,
    todosPerPage: 5
  }

  handleDisplay = (e) => {
    let display = e.currentTarget.id
    this.setState({
      todosPerPage: display,
      currentPage: 1
    })
  }

  handlePageId = (e) => {
  let number = (parseInt(e.currentTarget.id,10))
    this.setState({currentPage: number})
  }

  closeTab = ()=> {
    this.props.handleClose(false)
  }

  render() {
     let currentPage = this.state.currentPage
     let todosPerPage = this.state.todosPerPage
     let noneSquares = true
     let allSquares = this.props.squares
     let numberOfSquares = allSquares.length
    if(this.props.squares.length>0) {
      noneSquares = false
    }

    const indexOfLastCoord = currentPage * todosPerPage
    const indexOfFirstCoord = indexOfLastCoord- todosPerPage
    const currentSquare = allSquares.slice(indexOfFirstCoord, indexOfLastCoord)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allSquares.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

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
      return 1
    })
    let squares = currentSquare.map((sq, i)=>{
      return (
        <li key={sq.id}>
          {"Coordinates: P1 [x: " + sq.p1.x + " y: " + sq.p1.y
          + "], P2 [x: " + sq.p2.x + " y: " + sq.p2.y
          + "], P3 [x: " + sq.p3.x + " y: " + sq.p3.y
          + "], P4 [x: " + sq.p4.x + " y: " + sq.p4.y + "]"
        }
        </li>
      )
    })
    return (
      <div>

      {this.props.squaresOn && <div className="squares">
        <div
           className="closeTab"
           onClick={this.closeTab}
           >X</div>
        <div className="squaresCont">
          {noneSquares &&
            <div className="notFound">
              Nothing was found
           </div>}
           {!noneSquares && <div>Number of squares: {numberOfSquares}</div>}
           {!noneSquares &&
          <div className="displaySq">
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
          </div> }
          <ul className="square-list">
          {squares}
        </ul>
        <ul id="sq-page-numbers">
          {renderPageNumbers}
        </ul>
        </div>
      </div>}
    </div>
    );
  }
}

export default Squares
