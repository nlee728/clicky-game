import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import Alert from "../components/Alert";
import Col from "../components/Col";
import Row from "../components/Row";

class Home extends Component {
  state = {
    image: "",
    match: false,
    matchCount: 0
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.loadCards();
  }

  handleBtnClick = event => {
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem("data-value").value;
    // Clone this.state to the newState object
    // We'll modify this object and use it to set our component's state
    const newState = { ...this.state };

    if (btnType === "pick") {
      // Set newState.match to either true or false depending on whether or not the dog likes us (1/5 chance)
      newState.match = 1 === Math.floor(Math.random() * 5) + 1;

      // Set newState.matchCount equal to its current value or its current value + 1 depending on whether the dog likes us
      newState.matchCount = newState.match
        ? newState.matchCount + 1
        : newState.matchCount;
    } else {
      // If we thumbs down'ed the dog, we haven't matched with it
      newState.match = false;
    }
    // Replace our component's state with newState, load the next dog image
    this.setState(newState);
    this.loadCards();
  };

  loadCards = () => {
    API.getRandomCard()
      .then(res =>
        this.setState({
          image: res.data.message
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1 className="text-center">Click on a Card!</h1>
        <h3 className="text-center">
          Click on any image to earn points, but don't click on any more than once.
        </h3>
        <Row>
        <Col></Col>
          <Col>
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />  
          </Col>
          <Col>
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />  
          </Col>
          <Col>
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />  
          </Col>
          <Col>
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />
          <Card image={this.state.image} handleBtnClick={this.handleBtnClick} />  
          </Col>
        </Row>
        <h1 className="text-center">
         Your Score: {this.state.matchCount}
        </h1>
        <Alert style={{ opacity: this.state.match ? 1 : 0 }} type="success">
          Nice job! You got that one correct!
        </Alert>
      </div>
    );
  }
}

export default Home;
