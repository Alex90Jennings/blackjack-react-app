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

  return (
    <div className="App main-container">
      <Header />
      <Dealer
        dealerHand={dealerHand}
        setDealerHand={setDealerHand}
        countScore={countScore}
      />
      <Player
        playerHand={playerHand}
        dealCardToPlayer={dealCardToPlayer}
        countScore={countScore}
        dealerPlaysHand={dealerPlaysHand}
      />
      <Rules />
    </div>
  );
}

export default Blackjack;
