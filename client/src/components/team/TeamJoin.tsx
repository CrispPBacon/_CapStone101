import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default function TeamJoin() {
  const { id } = useParams();
  const [msg, setMsg] = useState("Hello");
  useEffect(() => {
    const token = cookies.get("TOKEN");
    console.log(token);
    api
      .post(
        `/api/team/join`,
        { data: { team_id: id } },
        {
          headers: { Authorization: `Bearer ${cookies.get("TOKEN")}` },
        }
      )
      .then(() => {
        setMsg("You have applied for this team");
      })
      .catch((error) =>
        setMsg(error?.response?.data?.error?.msg ?? error.message)
      );
  }, [id]);
  return <div>{msg}</div>;
}
