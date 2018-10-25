import React, { Component } from "react";
import FrogCard from "./components/FrogCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import frogs from "./frogs.json";
import "./App.css";
import Jumbotron from "./components/Jumbotron";

  class App extends Component {
    state = {
      frogs: frogs,
      score: 0,
      highScore: 0,
      alert: "Good luck. Ribbit."
    };
  
    // When the component mounts, load the cards to be displayed
    componentDidMount() {
      this.randomizeCards();
    }
  
     // handleIncrement increases this.state.count by 1
    handleIncrement = () => {
      // We always use the setState method to update a component's state
      this.setState({ score: this.state.score + 1 });
    };

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
      const resetCards = this.state.frogs.map(frogs => {
        frogs.clicked = false;
        return frogs;
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
            chosen.clicked = true;
            //Increment score by 1
            this.handleIncrement();

            //Check highscore against current score and update
          if (newState.score > newState.highScore) {
            this.setState({ highScore: newState.score + 1 });
          }

          //If the correct answer is the final guess, the user wins. Reset game
          if ((newState.score + 1) === newState.frogs.length) {
            this.setState({ alert: "You win! Ribbit Ribbit!" });
            this.resetGame();
          }

         } else if
          // If the card has already been clicked...
          (chosen.clicked === true) {
            // Alert user the card has already been clicked, reset the game
            this.setState({ alert: "Croooaak, you already clicked that one! " });
            this.resetGame();
          };
        }
        return chosen;
      })

      //Update the chosen card and shuffle the cards
      this.setState({ frogs: chosenCard });
      this.randomizeCards();
    }

  // Map over this.state.frogs and render a frogCard component for each frog object
  render() {
    return (
      <Wrapper>
        <Navbar
        score={this.state.score}
        highScore={this.state.highScore}
        alert={this.state.alert}
        />
        <Jumbotron />
        {this.state.frogs.map(frog => (
          <FrogCard
            handleBtnClick={this.handleBtnClick}
            id={frog.id}
            key={frog.id}
            image={frog.image}
          />
        ))}
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
