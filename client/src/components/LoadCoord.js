import React, { Component } from 'react';

class LoadCoord extends Component {

handleLoad = (e)=> {
  let id = e.currentTarget.id
  this.props.loadId(id)
}

loadList = ()=> {
  this.props.loadList()
}

  render() {
    let loadItems = false
    loadItems = this.props.loadCoord.length > 0 ? true : false
    let loadList = this.props.loadCoord.map(list=>{
      return (
        <li
           id={list.name}
           onClick={this.handleLoad}
           key={list.name}
           className="loadListNames"
           >{list.name}
         </li>
      )
    })
    return (
      <div
        className="load"
        >
          <div
             className="closeTab"
             onClick={this.loadList}
             >X</div>
          { !loadItems && <div>Nothing to load</div>}
          { loadItems && <div className="loadCont">
          <h4>Pick a list to load</h4>
          <ul className="loadList">
            {loadList}
          </ul>

         </div>}
      </div>
    );
  }
}

export default LoadCoord;
