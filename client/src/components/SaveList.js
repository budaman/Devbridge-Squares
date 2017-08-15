import React, { Component } from 'react'


class SaveList extends Component {

    state = {
      name: ''
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
       if (this.props.coord.length !== 0 && this.state.name !== ''){
        fetch('coord', {
            method: 'put',
           headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: this.state.name,
              coord: this.props.coord
            })
        })



        alert('List saved as' + this.state.name)
        this.props.saveList()
     } else alert('not everething is filled')
    }

    render() {

    return (
    <div
      className="save"
      >
      <input
        type="text"
        onChange={this.handleName}
      />
      <button
        onClick={this.handlePost}
        >Save</button>
      <div
         className="closeTab"
         onClick={this.saveList}
         >X</div>
    </div>
    );
  }
}

export default SaveList
