import React from "react";
import { SemiCardDiv, RankHeading, SuiteImg } from "../styles";
import club from "../assets/images/club.png";
import diamond from "../assets/images/diamond.png";
import heart from "../assets/images/heart.png";
import spade from "../assets/images/spade.png";

const suitesImgs = { club: club, diamond: diamond, heart: heart, spade: spade };

const SemiCard = ({ card, inverted }) => {
  return (
    <SemiCardDiv inverted={inverted}>
      <RankHeading>{card.rank}</RankHeading>
      <SuiteImg src={suitesImgs[card.suite]} inverted={inverted} />
    </SemiCardDiv>
  );
};

export default SemiCard;
