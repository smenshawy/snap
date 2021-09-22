import React from "react";
import { CardDiv } from "../styles";
import { CardFaceDown } from "../styles";

const CardPile = ({ cardsAmount }) => {
  return <CardFaceDown cardsAmount={cardsAmount}></CardFaceDown>;
};

export default CardPile;
