import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import api from "../api/api";

interface UserProps {
  _id: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface childProp {
  children: React.ReactNode;
}

interface AuthContextType {
  auth: authProps | null;
  isLoading: boolean;
  setAuth: Dispatch<SetStateAction<authProps | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
interface authProps {
  user: UserProps;
}
const initialContext: AuthContextType = {
  auth: null,
  isLoading: true,
  setAuth: () => {},
  setLoading: () => {},
};

const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }: childProp) => {
  const [auth, setAuth] = useState<authProps | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/profile", { withCredentials: true })
      .then((res) => {
        setAuth({ user: res.data });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e?.response?.data?.error || e);
        setAuth(null);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isLoading, setLoading, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
