import RenderCards from "./RenderCards";
import RenderPlayerButtons from "./RenderPlayerButtons";

function Player(props) {
  const hand = props.playerHand;
  const countScore = props.countScore;
  const dealerPlaysHand = props.dealerPlaysHand;
  const dealCardToPlayer = props.dealCardToPlayer;
  const isBust = props.isBust;
  const isTwentyOne = props.isTwentyOne;
  const setAIState = props.setAIState;

  const score = countScore(hand);

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
          <div className="three-columns-expand-one-three">
            <div></div>
            <RenderPlayerButtons
              hand={hand}
              isBust={isBust}
              dealCardToPlayer={dealCardToPlayer}
              dealerPlaysHand={dealerPlaysHand}
              isTwentyOne={isTwentyOne}
              setAIState={setAIState}
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
