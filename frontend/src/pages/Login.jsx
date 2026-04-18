import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;