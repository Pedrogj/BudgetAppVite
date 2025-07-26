import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import { AppContent } from "./components/layout/AppContent";

function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <AppContent />
      </TransactionProvider>
    </AuthProvider>
  );
}

export default App;
