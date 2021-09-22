import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Card from "./components/Card";
import CardPile from "./components/CardPile";
import Slider from "./components/Slider";

import cards from "./constants/cards";
import shuffle from "./utils/shuffle";

import {
  AppContainer,
  CenteredH1,
  CenteredH2,
  CardsContainer,
  TransparentButton,
  CenteredButton,
} from "./styles";

const initialGame = {
  gameStarted: false,
  shuffledCards: [],
  playerCards: [],
  computerCards: [],
  groundCards: [],
  isComputerTurn: undefined,
  canSnap: false,
  computerSnapped: false,
  playerSnapped: false,
  computerWon: false,
  playerWon: false,
};

const maxReactionTime = 5000; //5 sec
const computerPlayersAfter = 1000; //1 sec

const App = () => {
  const [game, setGame] = useState(initialGame);
  const {
    gameStarted,
    computerCards,
    groundCards,
    playerCards,
    isComputerTurn,
    canSnap,
    computerSnapped,
    playerSnapped,
    computerWon,
    playerWon,
  } = game;
  const [reactionTime, setReactionTime] = useState(maxReactionTime);

  useEffect(() => {
    if (!gameStarted || computerWon) {
      return;
    }
    // If player runs out of cards, computer wins
    if (playerCards.length === 0) {
      setGame((prevGame) => {
        return { ...prevGame, computerWon: true };
      });
      return;
    }

    // If computer runs out of cards, player wins
    if (computerCards.length === 0) {
      setGame((prevGame) => {
        return { ...prevGame, playerWon: true };
      });
      return;
    }

    // If it is computer turn and no chance to snap, computer plays
    if (isComputerTurn && !canSnap) {
      setTimeout(() => {
        setGame((prevGame) => {
          const [newCompuerCards, newGroundCards, isMatchingCard] = moveCard(
            prevGame.computerCards,
            prevGame.groundCards
          );
          return {
            ...prevGame,
            computerCards: newCompuerCards,
            groundCards: newGroundCards,
            isComputerTurn: false,
            canSnap: isMatchingCard,
            computerSnapped: false,
            playerSnapped: false,
          };
        });
      }, computerPlayersAfter);
    }
  }, [gameStarted, isComputerTurn, canSnap, computerCards, playerCards]);

  // Start a new game
  const startClickHandler = () => {
    setGame(() => {
      const shuffledCards = shuffle(cards);
      return {
        ...initialGame,
        gameStarted: true,
        shuffledCards,
        playerCards: shuffledCards.slice(0, shuffledCards.length / 2),
        computerCards: shuffledCards.slice(shuffledCards.length / 2),
        isComputerTurn: Math.random() < 0.5,
      };
    });
  };

  // Player plays
  const playerPlaysHandler = () => {
    setGame((prevGame) => {
      const [newPlayerCards, newGroundCards, isMatchingCard] = moveCard(
        prevGame.playerCards,
        prevGame.groundCards
      );
      return {
        ...prevGame,
        playerCards: newPlayerCards,
        groundCards: newGroundCards,
        isComputerTurn: true,
        canSnap: isMatchingCard,
        computerSnapped: false,
        playerSnapped: false,
      };
    });
  };

  // Player snaps
  const playerSnapsHandler = () => {
    movePile(false);
  };

  // move one card when computer/player plays
  const moveCard = (moveFromPile, moveToPile) => {
    const card = moveFromPile[moveFromPile.length - 1];
    let isMatchingCard = false;
    if (moveToPile.length > 0 && moveToPile[0].rank === card.rank) {
      isMatchingCard = true;
      setTimeout(() => {
        movePile(true);
      }, reactionTime);
    }
    return [
      moveFromPile.slice(0, moveFromPile.length - 1),
      [card, ...moveToPile],
      isMatchingCard,
    ];
  };

  // move the ground pile when computer/player snaps
  // if moveToComputer is true, move the pile to computer. If false, move it to player
  const movePile = (moveToComputer) => {
    setGame((prevGame) => {
      if (prevGame.canSnap) {
        return {
          ...prevGame,
          computerCards: moveToComputer
            ? prevGame.groundCards.concat(prevGame.computerCards)
            : prevGame.computerCards,
          playerCards: !moveToComputer
            ? prevGame.groundCards.concat(prevGame.playerCards)
            : prevGame.playerCards,
          groundCards: [],
          canSnap: false,
          computerSnapped: moveToComputer,
          playerSnapped: !moveToComputer,
        };
      } else {
        return { ...prevGame };
      }
    });
  };

  // Reset reaction time,  value passed is between 0-1
  const sliderChangeHandler = (value) => {
    setReactionTime(value * maxReactionTime);
  };

  return (
    <AppContainer>
      <header>
        <h1>Snap</h1>
      </header>

      <CardsContainer>
        <div>
          <CenteredH2
            isLarge={!gameStarted || (gameStarted && isComputerTurn)}
            isSilver={computerSnapped}
            isGold={computerWon}
          >
            {`Computer ${computerSnapped ? "snapped" : ""}${
              computerWon ? "won" : ""
            }`}
          </CenteredH2>
          <CardPile cardsAmount={computerCards.length} />
        </div>
        <TransparentButton disabled={!canSnap} onClick={playerSnapsHandler}>
          <Card card={groundCards[0] ?? null} />
        </TransparentButton>
        <div>
          <CenteredH2
            isLarge={!gameStarted || (gameStarted && !isComputerTurn)}
            isSilver={playerSnapped}
            isGold={playerWon}
          >
            {`Player ${playerSnapped ? "snapped" : ""}${
              playerWon ? "won" : ""
            }`}
          </CenteredH2>
          <TransparentButton
            onClick={playerPlaysHandler}
            disabled={
              !gameStarted ||
              isComputerTurn ||
              playerWon ||
              playerCards.length === 0 ||
              canSnap
            }
          >
            <CardPile cardsAmount={playerCards.length} />
          </TransparentButton>
        </div>
      </CardsContainer>
      <CenteredButton onClick={startClickHandler}>Start</CenteredButton>
      Reaction time <Slider initialValue={1} onChange={sliderChangeHandler} />
    </AppContainer>
  );
};

export default App;
