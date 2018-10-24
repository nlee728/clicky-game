import React from "react";
import "./FrogCard.css";

const FrogCard = props => (
  <div className="card">
    <div className="img-container">
      <img alt={props.name} src={props.image} onClick={() => props.handleBtnClick(props.id)}/>
    </div>
  </div>
);

export default FrogCard;
