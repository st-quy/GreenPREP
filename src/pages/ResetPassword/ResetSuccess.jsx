import { ResetSuccessImg } from "@assets/images";
import { Link } from "react-router-dom";

const ResetSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-center">
        <img
          src={ResetSuccessImg}
          alt="Password Reset Success"
          className="mb-6 max-w-xxl"
        />
        <h2 className="text-2xl font-bold mb-2">
          Reset password successfully.
        </h2>
        <p className="text-gray-600 mb-6">
          Your password has been successfully reset. Please log in again.
        </p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ResetSuccess;
