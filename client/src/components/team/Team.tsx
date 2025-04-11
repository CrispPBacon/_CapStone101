import { useEffect, useState } from "react";
import api from "../../api/api";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/utils";

//        "_id": "6758f228c5cfc6dc1a441ddf",
//         "name": "Engineering Team",
//         "description": "The Best Engineers",
//         "budget": 0,
//         "members": [
//             {
//                 "user_id": {
//                     "_id": "674f25c09d1abbd514b5a7f0",
//                     "name": "Allan Soriano"
//                 },
//                 "role": "operator",
//                 "_id": "6758f228c5cfc6dc1a441de0"
//             }
//         ],
//         "teams": [],
//         "createdAt": "2024-12-11T02:00:08.581Z",
//         "updatedAt": "2024-12-11T02:00:08.581Z",
//         "__v": 0

const cookies = new Cookies();

type MemberType = {
  user_id: {
    _id: string;
    name: string;
  };
  role: string;
  _id: string;
};

interface TeamType {
  _id: string;
  name: string;
  description: string;
  budget: number;
  members: MemberType[];
  teams: string[];
  createdAt: Date;
  updatedAt: Date;
}

export default function Team() {
  const navigate = useNavigate();
  const location = useLocation();

  const [teams, setTeams] = useState<TeamType[]>([]);
  useEffect(() => {
    api
      .get("/api/team", {
        headers: { Authorization: `Bearer ${cookies.get("TOKEN")}` },
      })
      .then((res) => {
        // console.log(res);
        setTeams(res.data);
      })
      .catch((error) =>
        console.log(error?.response?.data?.error?.msg ?? error.message)
      );
  }, []);

  return (
    <div className="container team--container">
      <main className="team--layout">
        <header>
          <h1>Teams</h1>
          <div className="header-actions">
            <button
              className="btn"
              onClick={() =>
                navigate("/new/team", {
                  state: { from: location },
                })
              }
            >
              New Team
            </button>
          </div>
        </header>
        <table className="team--table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Budget</th>
              <th>Members</th>
              <th>Teams</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <Item
                key={team._id}
                _id={team._id}
                name={team.name}
                description={team.description}
                budget={team.budget}
                members={team.members}
                teams={team.teams}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

type ItemType = {
  _id: string;
  name: string;
  description: string;
  budget: number;
  members: MemberType[];
  teams: string[];
};

function Item({ _id, name, description, budget, members, teams }: ItemType) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = () =>
    navigate(`/dashboard/${_id}`, { state: { from: location } });
  return (
    <tr>
      <td onClick={handleNavigate}>
        <span style={{ color: "white" }}>{name}</span>
      </td>
      <td onClick={handleNavigate}>{description}</td>
      <td onClick={handleNavigate}>{formatCurrency(budget)}</td>
      <td onClick={handleNavigate}>{members.length}</td>
      <td onClick={handleNavigate}>{teams.length}</td>
      <td>
        <button className="btn config">Config</button>
      </td>
    </tr>
  );
}
