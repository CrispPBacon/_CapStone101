import { IonIcon } from "@ionic/react";
import {
  card,
  checkmarkDoneCircle,
  home,
  logOut,
  people,
} from "ionicons/icons";
import { useLocation, useNavigate } from "react-router-dom";

import profile from "../css/images/avatars/1.png";

import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import api from "../api/api";

const cookies = new Cookies();

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");

  useEffect(() => {
    const token = cookies.get("TOKEN");
    api
      .get("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setName(res.data.user.name))
      .catch((error) =>
        console.log(error?.response?.data?.error?.msg ?? error.message)
      );
  }, []);

  const handleNavigate = (str: string) => {
    const id = location.pathname.split("/")[2];
    navigate(`${str}/${id}`, {
      replace: true,
    });
  };

  const menuActive = (str: string) => {
    if (str == location.pathname.split("/")[1]) {
      return "menu-active";
    }
    return undefined;
  };

  const handleLogout = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="profile">
        <img src={profile} alt="profile" />
        <h1>{name}</h1>
      </div>
      <ul>
        <li
          onClick={() => handleNavigate("dashboard")}
          className={menuActive("dashboard")}
        >
          <span>
            <IonIcon icon={home} />
          </span>
          <h1>Dashboard</h1>
        </li>
        <li
          onClick={() => handleNavigate("expense")}
          className={menuActive("expense")}
        >
          <span>
            <IonIcon icon={card} />
          </span>
          <h1>Expenses</h1>
        </li>
        <li
          onClick={() => handleNavigate("approval")}
          className={menuActive("approval")}
        >
          <span>
            <IonIcon icon={checkmarkDoneCircle} />
          </span>
          <h1>Approval</h1>
        </li>
        {/* <li>
          <span>
            <IonIcon icon={options} />
          </span>
          <h1>Settings</h1>
        </li> */}
        <li onClick={() => navigate(`/`)}>
          <span style={{ color: "orange" }}>
            <IonIcon icon={people} />
          </span>
          <h1 style={{ color: "orange" }}>Teams</h1>
        </li>
        <li onClick={handleLogout}>
          <span style={{ color: "#ff5555" }}>
            <IonIcon icon={logOut} />
          </span>
          <h1 style={{ color: "#ff5555" }}>Logout</h1>
        </li>
      </ul>
      <div className="logo">
        <h1>ExpenseWise</h1>
      </div>
    </nav>
  );
}
