import "./index.css";
import Header from "./Header";
import Dealer from "./Dealer";
import Player from "./Player";
import Rules from "./Rules";

function Blackjack(props) {
  const dealerHand = props.dealerHand;
  const setDealerHand = props.setDealerHand;
  const playerHand = props.playerHand;
  const dealCardToPlayer = props.dealCardToPlayer;
  const countScore = props.countScore;
  const dealerPlaysHand = props.dealerPlaysHand;
  const isBust = props.isBust;
  const isTwentyOne = props.isTwentyOne;
  const setAIState = props.setAIState;
  const gameState= props.gameState
  const setGameState= props.setGameState
  const result = props.result
  const bet = props.bet
  const setBet = props.setBet
  const wallet = props.wallet

  return (
    <div className="App main-container">
      <Header />
      <Dealer
        dealerHand={dealerHand}
        setDealerHand={setDealerHand}
        countScore={countScore}
        isBust={isBust}
        gameState={gameState}
        setGameState={setGameState}
      />
      <Player
        playerHand={playerHand}
        dealerHand={dealerHand}
        dealCardToPlayer={dealCardToPlayer}
        countScore={countScore}
        dealerPlaysHand={dealerPlaysHand}
        isBust={isBust}
        isTwentyOne={isTwentyOne}
        setAIState={setAIState}
        gameState={gameState}
        setGameState={setGameState}
        result={result}
        bet={bet}
        setBet={setBet}
        wallet={wallet}
      />
      <Rules />
    </div>
  );
}

export default Blackjack;
