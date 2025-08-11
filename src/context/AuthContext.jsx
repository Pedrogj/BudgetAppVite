import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      setAuthLoading(true); // We ensure that it displays the loader immediately.
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setUser(data.session?.user || null);
        setAuthLoading(false);
      }
    };

    initAuth();

    // Listen to session changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signup = (email, password) => supabase.auth.signUp({ email, password });

  const logout = () => supabase.auth.signOut();

  // Global loader while session is being verified
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
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
