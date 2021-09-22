import styled, { css } from "styled-components";

export const CardDiv = styled.div`
  width: 200px;
  height: 300px;
  border-radius: 5px;
  margin: 0 30px;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & * {
    box-sizing: border-box;
  }
`;

export const CenteredH2 = styled.h2`
  text-align: center;
  height: 2.5rem;
  margin: 0;
  ${(props) =>
    props.isLarge &&
    css`
      font-size: 2rem;
    `};
  ${(props) =>
    props.isSilver &&
    css`
      color: silver;
    `};
  ${(props) =>
    props.isGold &&
    css`
      color: gold;
    `};
  transition: all 0.5s ease-in;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  padding: 10px;
`;

export const TransparentButton = styled.button`
  border: 0;
  background-color: transparent;
`;

export const CenteredButton = styled.button`
  display: block;
  margin: 50px auto;
`;

export const Track = styled.div`
  margin: 50px auto;
  width: ${(props) => props.trackWidth}px;
  border-bottom: 1px solid black;
  position: relative;
`;

export const Thumb = styled.span.attrs((props) => ({
  style: {
    left: `${props.left}px`,
  },
}))`
  background-color: black;
  width: ${(props) => props.thumbWidth}px;
  height: ${(props) => props.thumbWidth}px;
  position: absolute;
  top: -${(props) => props.thumbWidth / 2}px;
`;

export const CardFaceUp = styled(CardDiv)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 5px;
`;

export const SemiCardDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => (props.inverted ? "column-reverse" : "column")};
  align-items: ${(props) => (props.inverted ? "end" : "start")};
`;

export const RankHeading = styled.h1`
  margin: 10px;
  color: black;
`;

export const SuiteImg = styled.img`
  height: 25px;
  ${(props) =>
    props.inverted &&
    css`
      padding-right: 50px;
    `}
  ${(props) =>
    !props.inverted &&
    css`
      padding-left: 50px;
    `}
`;

export const CardFaceDown = styled(CardDiv)`
  box-shadow: 0
    ${(props) =>
      `${props.cardsAmount / 2}px ${
        props.cardsAmount / 2
      }px rgba(0, 0, 0, 0.2)`};
  background-color: ${(props) => (props.cardsAmount > 0 ? "red" : "grey")};
  transition: all .5s ease-in;
`;
