import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function TeamForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setRawBudget] = useState("");
  const [formattedBudget, setFormattedBudget] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, description, budget);
    api
      .post(
        "/api/team",
        { data: { name, description, budget } },
        {
          headers: { Authorization: `Bearer ${cookies.get("TOKEN")}` },
        }
      )
      .then((res) => console.log(res))
      .catch((error) =>
        console.log(error?.response?.data?.error?.msg ?? error.message)
      );
  };

  const handleBudget = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" || (Number(value) >= 0 && Number(value) <= 9999999)) {
      setRawBudget(value);
      const formattedValue =
        value === ""
          ? ""
          : new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            }).format(Number(value));
      setFormattedBudget(formattedValue);
    }
  };

  return (
    <div className="container team--container">
      <main className="team--layout new-team--container">
        <div className="new--team">
          <form className="team--form" onSubmit={handleSubmit}>
            <header>
              <h1>New Team</h1>
            </header>
            <div className="form-item">
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoSave="off"
                placeholder="Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoSave="off"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoSave="off"
                placeholder="Initial Budget (Optional)"
                value={formattedBudget}
                onChange={handleBudget}
              />
            </div>
            <button
              onClick={() => navigate(`/`)}
              style={{ color: "cyan" }}
              className="btn btn-team"
            >
              Save
            </button>
          </form>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-team"
            style={{ color: "#ff6961" }}
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
