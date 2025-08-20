import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { useLoading } from "./LoadingContext";
import { LoadingScreen } from "../components/LoadingScreen";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      setAuthLoading(true);

      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setUser(data.session?.user || null);
        setAuthLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user || null);
        setAuthLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    showLoading();
    const result = await supabase.auth.signInWithPassword({ email, password });
    hideLoading();
    return result;
  };

  const signup = async (email, password) => {
    showLoading();
    const result = await supabase.auth.signUp({ email, password });
    hideLoading();
    return result;
  };

  const logout = async () => {
    showLoading();
    console.log("ejecutando logout");
    await supabase.auth.signOut();
    setUser(null);
    hideLoading();
  };

  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
