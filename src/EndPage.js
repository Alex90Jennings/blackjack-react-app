import { Link } from "react-router-dom";

function EndPage() {
  return (
    <>
      <h1>Game</h1>
      <button>
        <Link to="/play">Deal</Link>
      </button>
    </>
  );
}

export default EndPage;
