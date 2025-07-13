import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";

import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { TransactionList } from "./components/TransactionList";
import { AuthForm } from "./components/AuthForm";

function AppContent() {
  const { user, authLoading, logout } = useAuth();

  if (authLoading)
    return (
      <>
        <div className="p4">Cargando Sesión...</div>
      </>
    );

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
    <TransactionProvider>
      <div className="mx-auto max-w-md overflow-hidden bg-white md:max-w-2xl p-4">
        <Toaster position="top-center" />
        <div className="flex justify-between items-center mb-4">
          <Header />
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
        <Balance />
        <AddTransactionForm />
        <TransactionList />
      </div>
    </TransactionProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
