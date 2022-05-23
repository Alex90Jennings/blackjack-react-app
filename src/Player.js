import RenderCards from "./RenderCards";

function Player(props) {
  const hand = props.playerHand;
  const countScore = props.countScore;
  const dealerPlaysHand = props.dealerPlaysHand;
  const dealCardToPlayer = props.dealCardToPlayer;

  const score = countScore(hand);

  const handleStandClick = (e) => {
    e.preventDefault();
    dealerPlaysHand();
  };

  const handleHitClick = (e) => {
    e.preventDefault();
    dealCardToPlayer();
  };

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
          <h2 className="dashed-border-blue">Player - {`${score}`}</h2>
          <div></div>
        </div>
        <div className="three-columns-expand-one-three">
          <div></div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <ul className="four-columns-expand-one-three list-reset">
              <li className="display-inline">
                <button onClick={() => handleHitClick(hand)}>Hit</button>
              </li>
              <li className="display-inline">
                <button onClick={() => handleStandClick(hand)}>Stand</button>
              </li>
            </ul>
            <div></div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Player;
