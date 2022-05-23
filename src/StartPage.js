import { Link } from "react-router-dom";

function StartPage() {
  return (
    <>
      <h1>Play A Hand?</h1>
      <button>
        <Link to="/play">Deal</Link>
      </button>
    </>
  );
}

export default StartPage;
