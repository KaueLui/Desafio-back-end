import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600">Bem-vindo ao Sistema</h1>
      <nav className="space-y-4">
        <Link
          to="/login"
          className="block w-48 text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="block w-48 text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          Register
        </Link>
        <Link
          to="/tasks"
          className="block w-48 text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Tasks
        </Link>
        <Link
          to="/tags"
          className="block w-48 text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Tags
        </Link>
      </nav>
    </div>
  );
};

export default Home;