import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { TransactionProvider } from "./context/TransactionContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <TransactionProvider>
          <AppRouter />
        </TransactionProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
