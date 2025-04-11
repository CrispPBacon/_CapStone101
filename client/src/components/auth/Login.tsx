import { IonIcon } from "@ionic/react";
import { lockClosed, person } from "ionicons/icons";
import { useState } from "react";
import api from "../../api/api";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const cookies = new Cookies();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post(
        "/api/auth/login",
        { data: { username, password } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        cookies.set("TOKEN", res.data, { path: "/" });
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) => console.log(error.response?.data?.error));
  };

  return (
    <div className="login-card-container">
      <div className="login-card">
        <div className="header">
          <h1>Sign In</h1>
          <p>We are happy to have you back</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
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
            <IonIcon icon={person} />
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
            <IonIcon icon={lockClosed} />
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
          <p onClick={() => navigate("/register")}>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
