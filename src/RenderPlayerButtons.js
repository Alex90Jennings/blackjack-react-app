function RenderCards(props) {
  const hand = props.hand;
  const isBust = props.isBust;
  const dealCardToPlayer = props.dealCardToPlayer;
  const dealerPlaysHand = props.dealerPlaysHand;
  const isTwentyOne = props.isTwentyOne;
  const setAIState = props.setAIState;

  const handleStandClick = () => {
    dealerPlaysHand();
    setAIState("drawing a card");
  };

  return (
    <>
      {isTwentyOne(hand) < 21 && (
        <ul className="four-columns-expand-one-four list-reset">
          <div></div>
          <li className="display-inline">
            <button onClick={() => dealCardToPlayer()}>HIT</button>
          </li>
          <li className="display-inline">
            <button onClick={() => handleStandClick()}>STAND</button>
          </li>
          <div></div>
        </ul>
      )}
      {isBust(hand) && (
        <ul className="three-columns-expand-one-three list-reset">
          <div></div>
          <li className="display-inline">
            <button onClick={() => setAIState("end game")}>😱😱😱😱😱😱</button>
          </li>
          <div></div>
        </ul>
      )}
      {isTwentyOne(hand) === 21 && (
        <ul className="three-columns-expand-one-three list-reset">
          <div></div>
          <li className="display-inline">
            <button onClick={() => handleStandClick()}>🙂🙂🙂🙂🙂🙂</button>
          </li>
          <div></div>
        </ul>
      )}
      {isTwentyOne(hand) === "BLACKJACK" && (
        <ul className="three-columns-expand-one-three list-reset">
          <div></div>
          <li className="display-inline">
            <button onClick={() => handleStandClick()}>😍😍😍😍😍😍</button>
          </li>
          <div></div>
        </ul>
      )}
    </>
  );
}

export default RenderCards;
