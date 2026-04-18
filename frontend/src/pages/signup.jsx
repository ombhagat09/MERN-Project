import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
      });

      alert("Account Created Successfully");
      navigate("/");
    } catch (error) {
      alert("Signup Failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
          Signup
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg">
            Signup
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;