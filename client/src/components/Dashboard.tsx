import { Bar } from "react-chartjs-2"; // Import the Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartOptions, ChartData } from "chart.js";
import { month, shortCurrency } from "../utils/utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import api from "../api/api";
import { ExpensesType } from "./expense/Expense";

// Register the chart components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const cookies = new Cookies();

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<ExpensesType[]>([]);
  const [budget, setBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const token = cookies.get("TOKEN");
    api
      .get(`/api/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setExpenses(res.data);
        setTotalExpenses(getTotal(res.data));
      })
      .catch((error) => {
        console.log(error?.response?.data?.error?.msg ?? error.message);
        navigate("/", { replace: true });
      });
    api
      .get(`/api/team/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setBudget(res.data.budget))
      .catch((error) =>
        console.log(error?.response?.data?.error?.msg ?? error.message)
      );
  }, [id, navigate]);

  // Define the data for the chart
  const data: ChartData<"bar"> = {
    labels: expenses
      .map((expense) => {
        const createdAt = new Date(expense.createdAt);
        return month[createdAt.getMonth()]; // Extract the month name
      })
      .filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
    datasets: [
      {
        barThickness: 20,
        label: "Expenses Data", // Label for the dataset
        data: expenses
          .map((expense) => {
            const createdAt = new Date(expense.createdAt);
            return month[createdAt.getMonth()];
          })
          .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
          .map((monthLabel) => {
            // Calculate total amount for each month
            return expenses
              .filter((expense) => {
                const createdAt = new Date(expense.createdAt);
                return monthLabel === month[createdAt.getMonth()]; // Match month
              })
              .reduce((total, expense) => total + expense.details.amount, 0); // Sum the amount
          }),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
        borderColor: "rgba(75, 192, 192, 1)", // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Define options for the chart
  const options: ChartOptions<"bar"> = {
    responsive: true, // Makes the chart responsive
    plugins: {
      legend: {
        display: false,
        position: "top", // Position the legend at the top
      },
      title: {
        display: true,
        text: "Monthly Expense",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis from zero
      },
    },
  };
  return (
    <main>
      <div className="dashboard-grid">
        <div className="dashboard-item">
          <header>
            <h1>Overview</h1>
          </header>
          <div className="dashboard-statistics">
            <div
              className="statistics-item"
              onClick={() => console.log(expenses)}
            >
              <h2> Expenses</h2>
              <h1>{shortCurrency(totalExpenses)}</h1>
            </div>
            <div className="statistics-item">
              <h2>Budget</h2>
              <h1>{shortCurrency(budget)}</h1>
            </div>
            <div className="statistics-item">
              <h2>Cash Flow</h2>
              <h1>{shortCurrency(budget - totalExpenses)}</h1>
            </div>
          </div>
        </div>
        <div className="dashboard-item">
          <header>
            <h1>Recent Expenses</h1>
          </header>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Member</th>
                <th>Team</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses?.slice(0, 4)?.map((expense) => (
                <RecentExpense
                  key={expense._id}
                  subject={expense.details.subject}
                  member={expense.user_id.name}
                  team={"Main"}
                  amount={expense.details.amount}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="dashboard-item">
          <header>
            <h1>Charts</h1>
          </header>
          <div className="dashboard-chart">
            <div className="chart-item">
              <Bar data={data} options={options} />
            </div>
            <div className="chart-item">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

interface RecentExpenseType {
  subject: string;
  member: string;
  team: string;
  amount: number;
}
function RecentExpense({ subject, member, team, amount }: RecentExpenseType) {
  return (
    <tr>
      <td>{subject}</td>
      <td>{member}</td>
      <td>
        <span>{team}</span>
      </td>
      <td>{shortCurrency(amount)}</td>
    </tr>
  );
}

function getTotal(expenses: ExpensesType[]) {
  let total = 0;
  for (const detail of expenses) {
    total += detail.details.amount;
  }
  return total;
}

// function getMonthsExpensesData(expenses: ExpensesType[]) {
//     const monthsList: string[] = [];
//     const currentDate = new Date();

//     for (const expense of expenses) {
//       const createdAt = new Date(expense.createdAt);

//       // Only process expenses from the current year
//       if (createdAt.getFullYear() === currentDate.getFullYear()) {
//         // Get the month from the expense date
//         const monthName = month[createdAt.getMonth()];

//         // Check if the month is already added to avoid duplicates
//         if (!monthsList.includes(monthName)) {
//           monthsList.push(monthName);
//         }
//       }
//     }

//     return monthsList;
//   }
