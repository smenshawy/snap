import React from "react";
import SemiCard from "./SemiCards";
import { CardFaceUp } from "../styles";

const Card = ({ card }) => {
  return (
    <CardFaceUp>
      {card && (
        <>
          <SemiCard card={card} />
          <SemiCard card={card} inverted={true} />
        </>
      )}
    </CardFaceUp>
  );
};

export default Card;
