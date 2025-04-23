import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { username, password };
    api
      .post("/api/login", { data }, { withCredentials: true })
      .then((res) => {
        console.log("LOGGED IN");
        setAuth({ user: res.data });
        navigate("/profile", { replace: true });
      })
      .catch((e) => console.log(e?.response?.data?.error || e));
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          autoSave="off"
          autoFocus
          required
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          autoSave="off"
          autoFocus
          required
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-dark">Login</button>
        <span>
          Don't have an account? <a href="/signup">Sign up</a>
        </span>
      </form>
    </div>
  );
}

export default Login;
