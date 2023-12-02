import { Link } from "react-router-dom";
import error from "../src/assets/image/error-1.png";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img src={error} alt="" />
        <p className="my-2 text-base font-medium text-gray-500">
          Page not found
        </p>
        <Link className="mt-2" to="/">
          {" "}
          <button className="btn">Go to home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
