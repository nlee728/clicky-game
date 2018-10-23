import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Card from "./components/Card";
// import Alert from "../components/Alert";
// import Col from "../components/Col";
// import Row from "../components/Row";
import frogs from "./cards.json";

class App extends Component {
  state = {
    cards: frogs,
    score: 0,
    highScore: 0,
    alert: "Good luck. Ribbit."
  };

  // When the component mounts, load the cards to be displayed
  componentDidMount() {
    console.log("Component mounted");
    this.randomizeCards();
  }

  randomizeCards = () => {
    const currentCards = this.state.frogs.slice();
    let newIndex = this.state.frogs.length;
    let randomIndex = 0;
    let shuffledCards = {};

    // Assign new indices to the cards to shuffle them
    while (newIndex) {
      randomIndex = Math.floor(Math.random() * newIndex--);
      shuffledCards = currentCards[newIndex];
      currentCards[newIndex] = currentCards[randomIndex];
      currentCards[randomIndex] = shuffledCards;
    }
    this.setState({
      frogs: currentCards,
    });
    return frogs;
  }

  // Return score to zero and all cards to a "clicked" value of false.
  resetGame = () => {
    const resetCards = this.state.frogs.map(cards => {
      cards.clicked = false;
      return cards;
    });
    this.setState({
      score: 0,
      frogs: resetCards
    });
  }

//When a card is clicked... (takes in the id)
  handleBtnClick = (id) => {
    const newState = { ...this.state };
    const chosenCard = newState.frogs.map(chosen => {
      if (chosen.id === id) {
        
        //If the card has not been clicked...
        if (chosen.clicked === false) {
          // Alert user and shuffle cards
          this.setState({ alert: "Nice job!" });
          //Increment score by 1
          this.setState({ score: newState.score + 1 });
          return chosen;
        
       } else if
        // If the card has already been clicked...
        (chosen.clicked === true) {
          // Alert user the card has already been clicked, reset the game
          this.setState({ alert: "Oops, you already clicked that one! Croooaak" });
          this.resetGame();
          return chosen;
        };
        
        //Check highscore against current score and update
        if (newState.score >= newState.highScore) {
          this.setState({ highScore: newState.score });
        }

        //If the correct answer is the final guess, the user wins. Reset game
        if ((newState.score + 1) === newState.frogs.length) {
          this.setState({ alert: "You win! Ribbit Ribbit!" });
          this.resetGame();
          return chosen;
        } 
        chosen.clicked = true;
      }
      return chosen;
    })
    //Update the chosen card and shuffle the cards
    this.setState({ frogs: chosenCard });
    this.randomizeCards();
  }

  render() {
    return (
        <Wrapper>
          <Navbar>
            score={this.state.score}
            highScore={this.state.highScore}
            alert={this.state.alert}
            </Navbar>
          
          {this.state.frogs.map(data => (
              <Card 
                data={data.id} 
                key={data.id}
                src={data.image}
                handleBtnClick={this.handleBtnClick}
              />
            ))}

          <Footer/>
        </Wrapper>
      );
   }
}

export default App;