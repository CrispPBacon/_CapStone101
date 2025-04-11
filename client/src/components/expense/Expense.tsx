import { IonIcon } from "@ionic/react";
import { bagHandle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { formatCurrency, month, toTitleCase } from "../../utils/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Expense() {
  const [expenses, setExpenses] = useState<ExpensesType[]>([]);
  const { id } = useParams();

  // const location = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if (id == "undefined") navigate("/", { replace: true });

    const token = cookies.get("TOKEN");
    api
      .get(`/api/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setExpenses(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error?.response?.data?.error?.msg ?? error.message);
        navigate("/", { replace: true });
      });
  }, [id, navigate]);

  return (
    <main>
      <header>
        <h1>Expenses</h1>
        <div className="header-actions">
          <button
            className="btn"
            onClick={() =>
              navigate(`/new/expense/${id}`, { state: { from: location } })
            }
          >
            + New expense
          </button>
        </div>
      </header>
      <table className="expense-table">
        <thead>
          <tr>
            <th className="except">
              <input type="checkbox" />
            </th>
            <th>Details</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Report</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0
            ? expenses.map((i) => (
                <Item
                  key={i._id}
                  subject={toTitleCase(i.details.subject)}
                  merchant={i.details.merchant}
                  timestamp={new Date(i.createdAt)}
                  status={i.details.status}
                  amount={Number(i.details.amount)}
                />
              ))
            : null}
        </tbody>
      </table>
    </main>
  );
}

export interface ExpensesType {
  _id: string;
  user_id: { name: string; _id: string };
  type: string;
  details: ItemType;
  createdAt: Date;
}

interface ItemType {
  subject: string;
  merchant: string;
  amount: number;
  timestamp: Date;
  status: string;
}

type StyleType = {
  [key: string]: string;
};
function Item({ subject, merchant, amount, timestamp, status }: ItemType) {
  const style: StyleType = {
    pending: "orange",
    draft: "#ff6961",
    accepted: "greenyellow",
  };

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <div>
          <IonIcon icon={bagHandle}></IonIcon>
          <span>
            <p>{`${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}`}</p>
            <h1>{subject}</h1>
          </span>
        </div>
      </td>

      <td>{merchant}</td>
      <td>{formatCurrency(amount, "PHP")}</td>
      <td>{`${month[timestamp.getMonth() - 1]} ${timestamp.getDate()}`}</td>
      <td className="status">
        <span style={{ backgroundColor: style[status], color: "black" }}>
          {toTitleCase(status)}
        </span>
      </td>
    </tr>
  );
}
