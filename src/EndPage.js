import { Link } from "react-router-dom";

function EndPage(props) {
  const result = props.result;

  return (
    <div className="centering">
      <div className="three-columns-expand-one-three">
        <div></div>
        <div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <div>
              <h1>{`${result}`}</h1>
            </div>
            <div></div>
          </div>
          <div className="three-columns-expand-one-three">
            <div></div>
            <button className="center-wrapper">
              <Link to="/">PLAY AGAIN</Link>
            </button>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default EndPage;
