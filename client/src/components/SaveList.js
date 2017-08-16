import React, { Component } from 'react'


class SaveList extends Component {

    state = {
      name: '',
      nameEmpty: false
    }

    saveList = () => {
      this.props.saveList()
    }

    handleName = (e) => {
        let name = e.target.value
        this.setState({
          name: name
        })
    }

    handlePost = () =>{
       if (this.state.name !== ''){
        fetch('coord', {
            method: 'put',
           headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: this.state.name,
              coord: this.props.coord
            })
        })
        alert('List saved as ' + this.state.name)
        this.setState({
          nameEmpty: false
        })
        this.props.saveList()
     } else {
       this.setState({
         nameEmpty: true
       })
     }
    }

    render() {
      let saveItem = false
      saveItem = this.props.coord.length > 0 ? true : false
    return (
    <div
      className="save"
      >
      {!saveItem && <div>Nothing to save</div>}
      { saveItem && <div className="saveCont">
      <input
        type="text"
        onChange={this.handleName}
        placeholder="Type name of list"
      />
      <button
        onClick={this.handlePost}
        >Save</button>
        { this.state.nameEmpty && <p className="warning">Enter list name</p>}
      </div> }
      <div
         className="closeTab"
         onClick={this.saveList}
         >X</div>
    </div>
    );
  }
}

export default SaveList
