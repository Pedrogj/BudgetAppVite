import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

import { Header } from "../Header";
import { Balance } from "../Balance";
import { AddTransactionForm } from "../AddTransactionForm";
import { TransactionList } from "../TransactionList";
import { AuthForm } from "../AuthForm";

import { LogoutButton } from "./LogoutButton";

export const AppContent = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div className="p4">Cargando sesion</div>;
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Toaster position="top-center" />
        <h1 className="text-xl font-semibold mb-4">
          Inicia sesión para continuar
        </h1>
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md overflow-hidden bg-white md:max-w-2xl p-4">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-4">
        <Header />
        <LogoutButton />
      </div>
      <Balance />
      <AddTransactionForm />
      <TransactionList />
    </div>
  );
};
