import RenderCards from "./RenderCards";
import RenderPlayerButtons from "./RenderPlayerButtons";

function Player(props) {
  const hand = props.playerHand;
  const countScore = props.countScore;
  const dealerPlaysHand = props.dealerPlaysHand;
  const dealCardToPlayer = props.dealCardToPlayer;
  const isBust = props.isBust;
  const isTwentyOne = props.isTwentyOne;
  const setGameState= props.setGameState
  const gameState = props.gameState
  const dealerHand = props.dealerHand
  const result = props.result
  const score = countScore(hand);
  const bet = props.bet
  const setBet = props.setBet
  const wallet = props.wallet
  const doubled = props.doubled

  return (
    <section className="dashed-border-black center-wrapper">
      <div className="dashed-border-pink">
        <div className="three-columns-expand-one-three">
          <div></div>
          <RenderCards hand={hand} />
          <div></div>
        </div>
        <div className="three-columns-expand-one-three">
          <div></div>
          <h2 className="dashed-border-blue">
            Player - {isBust(hand) ? "BUST" : `${score}`}
          </h2>
          <div></div>
        </div>
        <div className="three-columns-expand-one-three">
          <div></div>
          <h2 className="dashed-border-blue">
            Wallet: {wallet}
          </h2>
          <div></div>
        </div>
        <div className="three-columns-expand-one-three">
          <div></div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <RenderPlayerButtons
              hand={hand}
              isBust={isBust}
              dealCardToPlayer={dealCardToPlayer}
              dealerPlaysHand={dealerPlaysHand}
              isTwentyOne={isTwentyOne}
              setGameState={setGameState}
              gameState={gameState}
              dealerHand={dealerHand}
              result={result}
              bet={bet}
              setBet={setBet}
              wallet={wallet}
              countScore={countScore}
              doubled={doubled}
            />
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Player;
