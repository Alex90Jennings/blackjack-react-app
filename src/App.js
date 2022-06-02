import { Route, Routes } from "react-router-dom";
import { useState } from "react";
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
  11: 10,
  12: 10,
  13: 10,
  14: 1,
};

export default function App() {
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [cardDeck, setCardDeck] = useState([]);
  const [AIState, setAIState] = useState("waiting");
  const [result, setResult] = useState(null);
  const [gameState, setGameState] = useState(null)
  const [wallet, setWallet] = useState(1000)
  const [bet, setBet] = useState(200)

  const retrieveNewDeckOfCards = () => {
    const suits = ['clubs', 'diamonds', 'hearts', 'spades']
    const cards = []
    for (let i = 0; i < suits.length; i++) {
      for (let j = 2; j < 15; j++) {
        const card = {number: j, suit: suits[i]}
        cards.push(card)
      }
    }
    setCardDeck(cards)
  }

  const dealCard = () => {
    if (cardDeck.length > 0) {
      const randomIndex = Math.floor(Math.random() * cardDeck.length)
      const cardToDeal = cardDeck[randomIndex]
      cardDeck.splice(randomIndex, 1)
      return cardToDeal
    }
    return false
  }

  const dealCardToPlayer = () => {
    const newCard = dealCard()
    setPlayerHand([...playerHand, newCard]);
  };

  
  const dealCardToDealer = () => {
    const newCard = dealCard()
    setDealerHand([...dealerHand, newCard]);
  };

  const dealerPlaysHand = () => {
    if (countScore(dealerHand) < 17) {
      setAIState("drawing a card");
    }
    if (countScore(dealerHand) > 16) setAIState("end game");
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
      console.log("player went bust")
      setResult("YOU LOSE");
      return
    }
    if (isBust(dealerHand)) {
      console.log("dealer went bust")
      setResult("YOU WIN");
      return
    }
    if (
      isTwentyOne(playerHand) === "BLACKJACK" &&
      isTwentyOne(dealerHand) !== "BLACKJACK"
    ) {
      console.log("you got a blackjack and the dealer didn't")
      setResult("YOU WIN DOUBLE");
      return
    }
    if (isTwentyOne(dealerHand) === "BLACKJACK" && isTwentyOne(playerHand) !== "BLACKJACK") {
      console.log("dealer got a blackjack and you didn't")
      setResult("YOU LOSE");
      return
    }
    if (countScore(dealerHand) > countScore(playerHand)) {
      console.log("dealer got a higher hand than you")
      setResult("YOU LOSE");
      return
    }
    if (countScore(dealerHand) < countScore(playerHand)) {
      console.log("you got a higher hand than the dealer")
      setResult("YOU WIN");
      return
    }
    if (countScore(dealerHand) === countScore(playerHand)) {
      console.log("you got the same score")
      setResult("IT'S A TIE");
      return
    }
  };

    if (gameState === "retrieve deck of cards") {
      retrieveNewDeckOfCards()
      setGameState("betting")
    }
    if(gameState === "betting"){}
    if (gameState === "deal first card to player") {
      dealCardToPlayer();
      setGameState("deal second card to player")
    }
    if (gameState === "deal second card to player") {
      dealCardToPlayer();
      setGameState("deal first card to dealer")
    }
    if (gameState === "deal first card to dealer") {
      dealCardToDealer();
      setGameState("player decision")
    }
    if (gameState === "player decision") {
      if(isTwentyOne(playerHand) === "BLACKJACK" && countScore(dealerHand) < 10 ) setGameState("end game")
      if(isBust(playerHand)) setGameState("compare scores")
    }
    if (gameState === "dealer AI") {
      setAIState("checking score")
    }
    if(gameState === "compare scores"){
      doesPlayerWin(dealerHand, playerHand)
      setGameState("end game")
    }
    if (gameState === "end game") {
      setGameState("result")
    }

    if (AIState === "checking score") {
      dealerPlaysHand();
    }
    if (AIState === "drawing a card") {
      dealCardToDealer();
    }
    if (AIState === "end game") {
      setAIState("waiting")
      setGameState("compare scores")
    }

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<StartPage setGameState={setGameState}/>} />
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
                isBust={isBust}
                isTwentyOne={isTwentyOne}
                setGameState={setGameState}
                result={result}
                wallet={wallet}
                setWallet={setWallet}
                bet={bet}
                setBet={setBet}
              />
            }
          />
          <Route path="/end" element={<EndPage setGameState={setGameState} setCardDeck={setCardDeck} setAIState={setAIState} setPlayerHand={setPlayerHand} setDealerHand={setDealerHand} setResult={setResult} result={result} wallet={wallet} setWallet={setWallet} bet={bet}/>} />
        </Routes>
      </main>
    </>
  );
}
