import { Link } from "react-router";


const Homepage = () => {
  return (
    <div>
      <h1>Welcome to MoMa Kids app!</h1>
      <Link to="/select-artwork">
        <button>Proceed</button>
      </Link>
    </div>
  );
}

export default Homepage;