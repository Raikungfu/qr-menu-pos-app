import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};
export default ErrorPage;
