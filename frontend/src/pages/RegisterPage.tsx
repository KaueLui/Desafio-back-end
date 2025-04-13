import Register from "../components/Auth/Register";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Register</h1>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;