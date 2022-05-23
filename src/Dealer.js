import RenderCards from "./RenderCards";

function Dealer(props) {
  const hand = props.dealerHand;
  const countScore = props.countScore;

  const score = countScore(hand);

  return (
    <section className="dashed-border-black center-wrapper">
      <div className="dashed-border-pink">
        <div className="three-columns-expand-one-three">
          <div></div>
          <h2 className="dashed-border-blue">Boolean Dealer - {`${score}`}</h2>
          <div></div>
        </div>
        <div className="three-columns-expand-one-three">
          <div></div>
          <RenderCards hand={hand} />
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Dealer;
