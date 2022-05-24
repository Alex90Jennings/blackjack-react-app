import { useState } from "react";
// import ReactCardFlip from "react-card-flip";

function RenderCards(props) {
  const cards = props.hand;
  const [isFlipped, setIsFlipped] = useState(false);

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      {cards.length === 0 && (
        <ul className="list-reset display-inline">
          <li className="display-inline">
            <img src="./cards/card-back.png" className="card" alt="card-back" />
          </li>
          <li className="display-inline">
            <img src="./cards/card-back.png" className="card" alt="card-back" />
          </li>
        </ul>
      )}
      {cards.length === 1 && (
        <ul className="list-reset display-inline">
          <li className="display-inline">
            <img src="./cards/card-back.png" className="card" alt="card-back" />
          </li>
          <li className="display-inline" key={cards[0].image}>
            {/* <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              {flip()}
              <img
                src="./cards/card-back.png"
                className="card"
                alt="card-back"
              /> */}
            <img src={cards[0].image} className="card" alt={cards[0].image} />
            {/* </ReactCardFlip> */}
          </li>
        </ul>
      )}
      {cards.length > 1 && (
        <ul className="list-reset display-inline">
          {cards.map((card) => {
            return (
              <li className="display-inline" key={card.image}>
                <img src={card.image} className="card" alt={card.image} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default RenderCards;
