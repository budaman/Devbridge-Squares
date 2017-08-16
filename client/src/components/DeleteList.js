import React, { Component } from 'react'


class DeleteList extends Component {

  deleteList = ()=> {
    this.props.deleteList()
  }

  handleDelete = (e)=> {
    let id = e.currentTarget.id
    fetch('coord', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': id
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
  })
    this.props.deleteList()
  }

    render() {
      let loadItems = false
      loadItems = this.props.loadCoord.length > 0 ? true : false
      let loadList = this.props.loadCoord.map(list=>{
        return (
          <li
             id={list.name}
             onClick={this.handleDelete}
             key={list.name}
             className="loadListNames"
             >{list.name}
           </li>
        )
      })
    return (
      <div
        className="load"
        >  <div
             className="closeTab"
             onClick={this.deleteList}
             >X</div>
          { !loadItems && <div>Nothing to delete</div>}
          { loadItems && <div className="loadCont">
          <h4>Pick a list to delete</h4>
          <ul className="loadList">
            {loadList}
          </ul>

         </div>}
      </div>
    )
  }
}

export default DeleteList
