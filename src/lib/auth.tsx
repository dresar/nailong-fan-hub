import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { apiFetch } from "./api";

type User = { id: string; username: string; email: string; role: "fan" | "admin"; avatar?: string; points?: number };

type AuthCtx = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password?: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("nailong_token");
      if (token) {
        try {
          const data = await apiFetch<User>("/auth/me");
          setUser(data);
        } catch (err) {
          localStorage.removeItem("nailong_token");
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (username: string, password = "password123") => {
    const data = await apiFetch<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    
    localStorage.setItem("nailong_token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("nailong_token");
    setUser(null);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
};
