import React, { Component } from 'react'


class Sidebar extends Component {
  state = {
    isActive: false
  }

  //toggle sidebar
  handleClick = () => {
    this.setState({isActive: !this.state.isActive})
  }

  //uploading file
  openFile = (e) => {
    let input = e.target
    let coord = []
    let reader = new FileReader()
      reader.onload = function(e){
        let text = reader.result
        let textInput = text.split(/\r\n|\n/)
        let array = textInput.map((num)=>{
            return num.split(/(\s+)/)
          })

            array.map((num)=>{
            let x = parseInt(num[0], 10)
            let y = parseInt(num[2], 10)
            let xInt = isNaN(x)
            let yInt = isNaN(y)

            if(Math.abs(x>5000) || (Math.abs(y>5000))) {
              alert('Interval of numbers shoud be in between -5000 and 5000. Error line: ' + num)
              return 0
            }
            if(num[1]===" " && !xInt && !yInt ){
            let id = num[0] + num[2]
            let duplicate = false;
            duplicate = coord.find((co)=>{
              return co.id === id
            })
            if(duplicate !== undefined) {
              alert('duplicate points are not allowed')
              return 0
            }
            if(coord.length > 9999) {
              return 0
            }
              coord.push({x: x, y: y, id: id})
          } else alert('Incorrect input. Error line: ' + num)
          return 1
          })
      };

   reader.onloadend = (e) => {
      this.props.getUplCoord(
        coord: coord
      )
      input.value = ''
   }
    reader.onerror = (evt) => {
        alert(evt.target.error.name);
    };
      reader.readAsText(input.files[0])
  }
  //simple clearing points function
  //clearing points and uploading does not have any rendering html content
  //so all the logic is here inside sidebar and not seperated as others
  clearPoints = () => {
    let coord = []
    this.props.getUplCoord(
      coord: coord
    )
  }

//calling dowloading to the main
  downloadTxtFile = () => {
    this.props.downloadTxtFile()
  }
//calling counting to the main
  countSquares = () => {
    this.props.countSquares()
  }
//calling saving to the main
  saveList = () => {
    this.props.saveList()
  }
//calling loading to the main
  loadList = () => {
    this.props.loadList()
  }
//calling deleting to the main
  deleteList = () => {
    this.props.deleteList()
  }


  render() {
    const { isActive} = this.state
    return (
      <div>
      <div className={"sidebarCont " + (isActive ? "sidebarCont-active" : "")}>
        <div>Upload
        <input
           type='file'
           className='fileInput'
           onChange={this.openFile}
           onClick={this.handleClose}
         />
        </div>
        <div onClick={this.downloadTxtFile}>Donwload</div>
        <div onClick={this.clearPoints}>Clear Points</div>  
        <div onClick={this.countSquares}>Show Squares</div>
          <div onClick={this.saveList}>Save List</div>
          <div onClick={this.loadList}>Load List</div>
          <div onClick={this.deleteList}>Delete List</div>
      </div>
      <img
        className={"arrow " + (isActive ? "arrow-active" : "")}
        alt="arrow"
        src="./arrow.png"
        onClick={this.handleClick}
       />
    </div>
    );
  }
}

export default Sidebar
