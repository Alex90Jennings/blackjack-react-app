import { Link } from "react-router-dom";

function StartPage(props) {
  const startGame = props.startGame;

  return (
    <div className="centering">
      <div className="three-columns-expand-one-three">
        <div></div>
        <div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <div>
              <h1>Play A Hand?</h1>
            </div>
            <div></div>
          </div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <button onClick={startGame} className="center-wrapper">
              <Link to="/play">DEAL</Link>
            </button>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default StartPage;
