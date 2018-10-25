import React from "react";
// import { Link } from "react-router-dom";
import "./Jumbotron.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Jumbotron = props => (
    <div className="jumbotron">
      <div className="instructions">
      Click on every image once to win the game. Don't click on any twice or it's game over! Good Luck! Ribbit!
      </div>
    </div>
   
);

export default Jumbotron;
