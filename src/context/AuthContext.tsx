import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
interface User {
  id: number;
  username?: string;
  password?: string;
  phone_number?: string;
  role: "superadmin" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL;
  // login
  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    await fetchUser(accessToken);
  };

  //get user

  const fetchUser = async (token: string) => {
    try {
      const response = await axios.get(API + "/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allAdmins = response.data.data;

      const loggedInUserId = Number(localStorage.getItem("user_id"));

      const currentUser = allAdmins.find((u: any) => u.id === loggedInUserId);

      if (currentUser) {
        setUser(currentUser);
      } else {
        logout();
      }
    } catch (err) {
      console.log("Fetch user error:", err);
      logout();
    }
  };

  // logout
  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        await axios.post(
          API + "/admin/logout",
          { refresh_token: refreshToken },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUser(token).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
