import React from "react";
import "./Card.css";
import "../../cards.json";

const Card = props => (
  <span className="clicked" onClick={() => props.handleBtnClick(props.data.id)}>
      <div className="card">
        <img alt="frog" src={props.data.image}/>
      </div>
  </span>
);

export default Card;