import { createContext, useContext, useState } from "react";
import { LoadingScreen } from "../components/LoadingScreen";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {loading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
};
