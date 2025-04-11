import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/api/auth/register", {
        data: { username, name, password, age: 0 },
      })
      .then(() => alert("You have registered successfully!"))
      .catch((error) =>
        alert(error?.response?.data?.error?.msg ?? error.message)
      );
  };
  return (
    <div className="login-card-container">
      <div className="login-card">
        <div className="header">
          <h1>Sign Up</h1>
          <p>We are happy to have you</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-item">
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              autoSave="off"
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              autoSave="off"
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              autoSave="off"
            />
          </div>
          <div className="form-item-other">
            <div className="item">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>
          <div className="login-form-submit">
            <input type="submit" value="LOGIN" />
          </div>
        </form>
        <div className="footer">
          <p onClick={() => navigate("/login")}>
            Already have an account? <a href="#">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
