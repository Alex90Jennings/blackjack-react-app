import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Blackjack from "./Blackjack";
import EndPage from "./EndPage";
import StartPage from "./StartPage";
import { useNavigate } from "react-router-dom";

const cardValue = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 10,
  QUEEN: 10,
  KING: 10,
  ACE: 1,
};

export default function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [cardDeck, setCardDeck] = useState([]);
  const [AIState, setAIState] = useState("waiting");
  const [result, setResult] = useState(null);

  // const [gameState, setGameState] = useState(0)

  //   if (gameState === 0) {
  //     triggered by deal button;
  //      deals the cards
  //      setGameState(1)
  //   }
  //   if (gameState === 1) {
  //     initialise game
  //      deal 2 cards to player and 1 to dealer
  //      setGameState(2)
  //   }
  //   if (gameState === 2 {
  //     player decides hit or stand
  //      if player bust setGameState(4)
  //      else setGameState(3)
  //   }
  //   if (gameState === 3) {
  //     runs dealerAI
  //      setGameState(4)
  //   }
  //   if (gameState === 4) {
  //     compare scores
  //      setResult(result)
  //      setGameState(5)
  //   }
  //   if (gameState === 5) {
  //     use result to render "you win" or "you lose" or "you tie"
  //       button to redeal setGameState(0)
  //   }

  useEffect(() => {
    if (AIState === "checking score") {
      dealerPlaysHand();
    }
    if (AIState === "drawing a card") {
      dealCardToDealer();
    }
    if (AIState === "end game") {
      doesPlayerWin(dealerHand, playerHand);
    }
    if (AIState === "navigate") {
      //link to /end;
    }
  });

  useEffect(() => {
    fetch(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then((res) => res.json())
      .then((cardDeck) => {
        setCardDeck(cardDeck);
      });
  }, []);

  const dealCardToDealer = async () => {
    const response = await fetch(
      `http://deckofcardsapi.com/api/deck/${cardDeck.deck_id}/draw/?count=1`
    );
    const result = await response.json();
    const card = result.cards[0];
    setDealerHand([...dealerHand, card]);
    if (AIState !== "waiting") {
      setAIState("checking score");
    }
  };

  const dealCardToPlayer = async () => {
    const response = await fetch(
      `http://deckofcardsapi.com/api/deck/${cardDeck.deck_id}/draw/?count=1`
    );
    const result = await response.json();
    const card = result.cards[0];
    setPlayerHand([...playerHand, card]);
  };

  const dealTwoCardsToPlayer = async () => {
    const response = await fetch(
      `http://deckofcardsapi.com/api/deck/${cardDeck.deck_id}/draw/?count=2`
    );
    const result = await response.json();
    const cardOne = result.cards[0];
    const cardTwo = result.cards[1];
    setPlayerHand([cardOne, cardTwo]);
  };

  const startGame = () => {
    dealTwoCardsToPlayer();
    dealCardToDealer();
  };

  const dealerPlaysHand = () => {
    if (countScore(dealerHand) < 17) {
      setAIState("drawing a card");
    }
    if (countScore(dealerHand) > 16) setAIState("end game");
  };

  const handHasAce = (hand) => {
    for (let i = 0; i < hand.length; i++) {
      const numberOfCard = hand[i].value;
      if (numberOfCard === "ACE") {
        return true;
      }
    }
    return false;
  };

  const countScore = (hand) => {
    let sum = 0;
    let aceIsEleven = false;
    let makeElevenAceOne = false;
    for (let i = 0; i < hand.length; i++) {
      const numberOfCard = hand[i].value;
      const valueOfCard = cardValue[numberOfCard];
      if (handHasAce(hand)) {
        if (numberOfCard === "ACE" && !aceIsEleven) {
          aceIsEleven = true;
          sum += 10;
        }
        sum += valueOfCard;
        if (sum > 21 && !makeElevenAceOne) {
          makeElevenAceOne = true;
          sum = sum - 10;
        }
      } else sum += valueOfCard;
    }
    return sum;
  };

  const isTwentyOne = (hand) => {
    if (countScore(hand) === 21) {
      if (hand.length === 2) {
        return "BLACKJACK";
      } else return 21;
    } else return countScore(hand);
  };
  const isBust = (hand) => {
    if (countScore(hand) < 22) {
      return false;
    }
    return true;
  };

  const doesPlayerWin = (dealerHand, playerHand) => {
    console.log(
      "dealer score: ",
      countScore(dealerHand),
      "playerScore: ",
      countScore(playerHand)
    );
    if (isBust(playerHand)) {
      setResult("YOU LOSE");
    }
    if (isBust(dealerHand)) {
      setResult("YOU WIN");
    }
    if (
      isTwentyOne(playerHand) === "BLACKJACK" &&
      isTwentyOne(dealerHand) !== "BLACKJACK"
    ) {
      setResult("YOU WIN DOUBLE");
    }
    if (isTwentyOne(dealerHand) === 0 && isTwentyOne(playerHand) !== 0) {
      setResult("YOU LOSE");
    }
    if (countScore(dealerHand) > countScore(playerHand)) {
      setResult("YOU LOSE");
    }
    if (countScore(dealerHand) < countScore(playerHand)) {
      setResult("YOU WIN");
    }
    if (countScore(dealerHand) === countScore(playerHand)) {
      setResult("IT'S A TIE");
    }

    setAIState("navigate");
  };

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            // {AIState === "navigate" ? <Redirect to="/end" /> : <EndPage result={result} />}
            path="/play"
            element={
              <Blackjack
                cardDeck={cardDeck}
                setCardDeck={setCardDeck}
                dealerHand={dealerHand}
                playerHand={playerHand}
                dealCardToPlayer={dealCardToPlayer}
                countScore={countScore}
                dealerPlaysHand={dealerPlaysHand}
                isBust={isBust}
                isTwentyOne={isTwentyOne}
                startGame={startGame}
                setAIState={setAIState}
              />
            }
          />
          <Route path="/end" element={<EndPage result={result} />} />
        </Routes>
      </main>
    </>
  );
}
