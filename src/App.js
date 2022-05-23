import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Blackjack from "./Blackjack";
import EndPage from "./EndPage";
import StartPage from "./StartPage";

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
  J: 10,
  Q: 10,
  K: 10,
  A: 1,
};

export default function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [cardDeck, setCardDeck] = useState([]);
  const [shouldDealToDealer, setShouldDealToDealer] = useState(false);
  const [shouldDealToPlayer, setShouldDealToPlayer] = useState(false);
  let callADeck = true;

  useEffect(() => {
    if (callADeck) {
      fetch(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
        .then((res) => res.json())
        .then((cardDeck) => {
          console.log("fetched card decks:", cardDeck);
          callADeck = false;
          setCardDeck(cardDeck);
        });
    }
  }, []);

  useEffect(() => {
    if (shouldDealToDealer) {
      fetch(
        `http://deckofcardsapi.com/api/deck/${cardDeck.deck_id}/draw/?count=1`
      )
        .then((res) => res.json())
        .then((card) => {
          console.log("card", card);
          setDealerHand([...dealerHand, card]);
          setShouldDealToDealer(false);
          console.log(dealerHand);
        });
    }
  }, [shouldDealToDealer]);

  useEffect(() => {
    if (shouldDealToPlayer) {
      fetch(
        `http://deckofcardsapi.com/api/deck/${cardDeck.deck_id}/draw/?count=1`
      )
        .then((res) => res.json())
        .then((card) => {
          console.log("card", card);
          setPlayerHand([...playerHand, card]);
          setShouldDealToPlayer(false);
          console.log(playerHand);
        });
    }
  }, [shouldDealToPlayer]);

  const dealCardToDealer = () => {
    setShouldDealToDealer(true);
  };

  const dealCardToPlayer = () => {
    setShouldDealToDealer(true);
  };

  // dealCardToPlayer();
  // setPlayerHand(dealCardToPlayer());
  // setDealerHand(dealCardToDealer());
  console.log("player hand: ", dealerHand);

  // const startGame = () => {
  //   setPlayerHand(dealCardToPlayer());
  //   setPlayerHand(dealCardToPlayer());
  //   setDealerHand(dealCardToDealer());
  // };

  const dealerPlaysHand = () => {
    while (countScore(dealerHand) < 17) {
      dealCardToDealer(dealerHand);
    }
    return countScore(dealerHand);
  };

  const handHasAce = (hand) => {
    for (let i = 0; i < hand.length; i++) {
      const numberOfCard = hand[i].number;
      if (numberOfCard === 14) {
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
      const numberOfCard = hand[i].number;
      const valueOfCard = cardValue[numberOfCard];
      if (handHasAce(hand)) {
        if (numberOfCard === 14 && !aceIsEleven) {
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

  const doesPlayerWin = (dealerHand, playerHand) => {
    if (isBust(playerHand)) return false;
    if (isBust(dealerHand)) return true;
    if (countScore(dealerHand) > countScore(playerHand)) return false;
    if (countScore(dealerHand) < countScore(playerHand)) return true;
    if (countScore(dealerHand) === countScore(playerHand)) return 0;
  };

  const isBust = (hand) => {
    if (countScore(hand) < 22) {
      return false;
    }
    return true;
  };

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
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
              />
            }
          />
          <Route
            path="/end"
            element={<EndPage doesPlayerWin={doesPlayerWin} />}
          />
        </Routes>
      </main>
    </>
  );
}
