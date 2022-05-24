import "./index.css";
import Header from "./Header";
import Dealer from "./Dealer";
import Player from "./Player";
import Rules from "./Rules";
import { useEffect } from "react";

function Blackjack(props) {
  const dealerHand = props.dealerHand;
  const setDealerHand = props.setDealerHand;
  const playerHand = props.playerHand;
  const dealCardToPlayer = props.dealCardToPlayer;
  const countScore = props.countScore;
  const dealerPlaysHand = props.dealerPlaysHand;
  const isBust = props.isBust;
  const isTwentyOne = props.isTwentyOne;
  const startGame = props.startGame;
  const setAIState = props.setAIState;

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="App main-container">
      <Header />
      <Dealer
        dealerHand={dealerHand}
        setDealerHand={setDealerHand}
        countScore={countScore}
        isBust={isBust}
      />
      <Player
        playerHand={playerHand}
        dealCardToPlayer={dealCardToPlayer}
        countScore={countScore}
        dealerPlaysHand={dealerPlaysHand}
        isBust={isBust}
        isTwentyOne={isTwentyOne}
        setAIState={setAIState}
      />
      <Rules />
    </div>
  );
}

export default Blackjack;
