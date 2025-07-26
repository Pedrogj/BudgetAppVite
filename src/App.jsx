import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppRouter />
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
