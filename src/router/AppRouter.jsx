import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { HistoryTransactionsPage } from "../pages/HistoryTransactionsPage";
import { LayoutAuthenticated } from "../components/layout/LayoutAuthenticated";
import { TransactionDetailPage } from "../pages/TransactionDetailPage";

export const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />

      <Route
        path="login"
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
      />

      {user && (
        <Route element={<LayoutAuthenticated />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transaction/:id" element={<TransactionDetailPage />} />
          <Route path="/historial" element={<HistoryTransactionsPage />} />
        </Route>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
