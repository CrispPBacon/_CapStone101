import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function ExpenseForm() {
  const [subject, setSubject] = useState("");
  const [merchant, setMerchant] = useState("");
  const [amount, setRawAmount] = useState("");
  const [formattedAmount, setFormattedAmount] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" || (Number(value) >= 0 && Number(value) <= 9999999)) {
      setRawAmount(value);
      const formattedValue =
        value === ""
          ? ""
          : new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
              minimumFractionDigits: 0,
            }).format(Number(value));
      setFormattedAmount(formattedValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = cookies.get("TOKEN");

    api
      .post(
        "/api/expense",
        {
          data: { subject, merchant, amount },
          team_id: id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => navigate(`/expense/${id}`))
      .catch((error) =>
        console.log(error?.response?.data?.error?.msg ?? error.message)
      );
  };

  return (
    <div className="container team--container">
      <main className="team--layout new-team--container">
        <div className="new--team">
          <form className="team--form" onSubmit={handleSubmit}>
            <header>
              <h1>New Expense</h1>
            </header>
            <div className="form-item">
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoSave="off"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoSave="off"
                placeholder="Merchant"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
              />
            </div>
            <div className="form-item">
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                autoSave="off"
                placeholder="Amount"
                value={formattedAmount}
                onChange={handleAmount}
              />
            </div>
            <button className="btn btn-team" style={{ color: "cyan" }}>
              Save
            </button>
          </form>
          <button
            onClick={() => navigate(`/expense/${id}`)}
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
