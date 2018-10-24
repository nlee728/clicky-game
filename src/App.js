import React, { Component } from "react";
import FrogCard from "./components/FrogCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
// import Title from "./components/Title";
import frogs from "./frogs.json";
import "./App.css";

  class App extends Component {
    state = {
      frogs: frogs,
      score: 0,
      highScore: 0,
      alert: "Good luck. Ribbit."
    };
  
    // When the component mounts, load the cards to be displayed
    componentDidMount() {
      console.log("Component mounted");
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
            this.handleIncrement();
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

  // handleBtnClick = id => {
  //   // Filter this.state.frogs for frogs with an id not equal to the id being removed
  //   const frogs = this.state.frogs.filter(frog => frog.id !== id);
  //   // Set this.state.frogs equal to the new frogs array
  //   this.setState({ frogs });
  // };

  // Map over this.state.frogs and render a frogCard component for each frog object
  render() {
    return (
      <Wrapper>
        <Navbar
        score={this.state.score}
        highScore={this.state.highScore}
        alert={this.state.alert}
        />
        {this.state.frogs.map(frog => (
          <FrogCard
            handleBtnClick={this.handleBtnClick}
            id={frog.id}
            key={frog.id}
            image={frog.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
