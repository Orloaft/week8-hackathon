import axios from "axios";
import React, { Component } from "react";
import ourLogo from "./assets/images/logo.png";
import "./App.css";
import testData from "./data/test.json";

class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    returnedObject: testData
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    console.log(formData.values());
    axios.post("http://localhost:8080/files", formData)
          .then((response) => {
              this.setState({returnedObject: response.data});
          });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      console.log(this.state.selectedFile);
      return (
        <div>
          <h2  className="white-text">File Details:</h2>

          <p  className="white-text">File Name: {this.state.selectedFile.name}</p>

          <p  className="white-text">File Type: {this.state.selectedFile.type}</p>

          <p  className="white-text">
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate &&
              this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4 className="white-text">Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  convertData = (input) => {

    let output = "";
    let myObject = {};

    input.result.tags.forEach((tag) => {
      myObject[tag.tag.en] = tag.confidence;
    })
    
    let count=0;
    for (let item in myObject) {
      output += `${item}, ${Math.floor(myObject[item])}%`
      count+=1;
      if(count===10) {
        break;
      }
    }

    return output;
  }

  render() {
    return (
      <div className="background">

        <header className="nav">
          <img className="nav__logo" src={ourLogo} alt="our logo"/>
          <h1 className="nav__title white-text">Web Eyes</h1> 
        </header>

        <div className="sections">
              <div className="sections__cards">
                <h3 className="white-text">Choose a file to upload</h3>
                <div>
                  <input className="form__input white-text" type="file" onChange={this.onFileChange} /><br></br><br></br><br></br>
                  <button className="form__button"onClick={this.onFileUpload}>Upload!</button>
                </div>
                {this.fileData()}

              </div>

              <div className="sections__cards white-text">
                  Uploaded image will go here

              </div>

              <div className="sections__cards white-text">
                  {this.convertData(testData)}
                  {/* {this.convertData(this.state.returnedObject)} */}
              </div>
        </div>




      </div>
    );
  }
}

export default App;

