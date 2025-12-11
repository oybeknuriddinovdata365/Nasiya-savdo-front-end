import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "superadmin" | "admin";

export interface User {
  id: number;
  username?: string;
  phone_number?: string;
  role: UserRole;
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

  // LOGIN
  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

    await fetchUser(accessToken);
  };

  // GET USER
  const fetchUser = async (token: string) => {
    try {
      const loggedInUserId = localStorage.getItem("user_id");
      if (!loggedInUserId) {
        logout();
        return;
      }

      const response = await axios.get(`${API}/admin/${loggedInUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedUser: User = response.data.data;

      if (fetchedUser.id === Number(loggedInUserId)) {
        setUser(fetchedUser);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      logout();
    }
  };

  // LOGOUT
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
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUser(null);
    }
  };

  // AUTO LOGIN TOKEN BOR BO'LSA
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
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// HOOK
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
