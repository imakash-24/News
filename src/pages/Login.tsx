import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nhost } from "../nhost";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔥 Before signing in a new user, log out any existing session
  useEffect(() => {
    const checkSession = async () => {
      if (nhost.auth.isAuthenticated()) {
        await nhost.auth.signOut(); // ✅ Force logout old session
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    // 🔥 Ensure old session is cleared before signing in
    await nhost.auth.signOut();

    const { session, error } = await nhost.auth.signIn({ email, password });

    if (error) {
      if (error.message.includes("invalid")) {
        setMessage("Invalid credentials! If you don’t have an account, please sign up.");
      } else {
        setMessage(error.message);
      }
    } else if (session) {
      // Check if the user's email is verified
      const user = await nhost.auth.getUser();

      if (user && user.emailVerified) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 2000);
      } else {
        setMessage("Please verify your email before logging in.");
        await nhost.auth.signOut(); // ❌ Log out user if not verified
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
      </div>

      <button className="login-button" onClick={handleLogin}>Login</button>
      <p className={message.includes("successful") ? "success" : "error"}>{message}</p>

      <p className="signup-text">
        Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
