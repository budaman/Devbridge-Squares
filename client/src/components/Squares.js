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


    console.log(allSquares)
    let squares = currentSquare.map((sq, i)=>{
      return (
        <li key={sq.id}>
          {"Coordinates: P1 x: [" + sq.p1.x + " y: " + sq.p1.y
          + "], P2 x: " + sq.p2.x + " y: " + sq.p2.y
          + ", P3 x: " + sq.p3.x + " y: " + sq.p3.y
          + ", P4 x: " + sq.p4.x + " y: " + sq.p4.y
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
              Any square was not found yet
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
        </div>
      </div>}
    </div>
    );
  }
}

export default Squares
