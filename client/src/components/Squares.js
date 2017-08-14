import React, { Component } from 'react'


class Squares extends Component {


  closeTab = ()=> {
    this.props.handleClose(false)
  }

  render() {

     let currentPage = 1
     let todosPerPage = 5
     let noneSquares = true
    if(this.props.squares.length>0) {
      noneSquares = false
    }
    let squares = this.props.squares.map((sq, i)=>{
      console.log(sq.p1)
      return (
        <li key={sq.id}>
          {"Coordinates of square: P1 x: " + sq.p1.x + " y: " + sq.p1.y
          + ", P2 x: " + sq.p2.x + " y: " + sq.p2.y
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
        <div>
          {noneSquares &&
            <div className="notFound">
              Any square was not found yet
           </div>}
           {!noneSquares &&
          <div className="displaySq">
            <div>5</div>
            <div>10</div>
            <div>20</div>
            <div>50</div>
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
