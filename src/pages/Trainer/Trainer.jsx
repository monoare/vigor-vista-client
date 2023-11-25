import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Trainer = () => {
  return (
    <div>
      <Navbar />
      <p className="pt-28">This is trainer page</p>
      <div>
        <Link to="/beATrainer">
          <button>Be a trainer</button>
        </Link>
      </div>
    </div>
  );
};

export default Trainer;
