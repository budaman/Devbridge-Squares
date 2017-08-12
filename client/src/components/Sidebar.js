import React, { Component } from 'react'


class Sidebar extends Component {
  state = {
    isActive: false
  }

  handleClick = () => {
    this.setState({isActive: !this.state.isActive})
  }



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
              coord.push({x: x, y: y, id: id})
          } else alert('Incorrect input. Error line: ' + num)
          return 1
          })
      };

   reader.onloadend = (e) => {
      this.props.getUplCoord(
        coord: coord
      )
   }



    reader.onerror = (evt) => {
        alert(evt.target.error.name);
    };

      reader.readAsText(input.files[0])
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
         />
        </div>
        <div>Donwload</div>
        <div>Save</div>
        <div>Find Squares</div>
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
