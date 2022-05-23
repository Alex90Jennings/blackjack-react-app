function RenderCards(props) {
  const cards = props.hand;

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
          <li className="display-inline" key={`${cards.code}`}>
            <img
              src={`cards/${cards.code}.png`}
              className="card"
              alt={`${cards.code}`}
            />
          </li>
        </ul>
      )}
      {cards.length > 1 && (
        <ul className="list-reset display-inline">
          {cards.map((card) => {
            return (
              <li className="display-inline" key={`${card.code}`}>
                <img
                  src={`cards/${card.code}.png`}
                  className="card"
                  alt={`${card.code}`}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default RenderCards;
