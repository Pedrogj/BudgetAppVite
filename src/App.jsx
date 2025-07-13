import { Toaster } from "react-hot-toast";

import { TransactionProvider } from "./context/TransactionContext";

import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { AddTransactionForm } from "./components/AddTransactionForm";
import { TransactionList } from "./components/TransactionList";

function App() {
  return (
    <TransactionProvider>
      <div className="mx-auto max-w-md overflow-hidden bg-white md:max-w-2xl p-4">
        <Toaster position="top-center" />
        <Header />
        <Balance />
        <AddTransactionForm />
        <TransactionList />
      </div>
    </TransactionProvider>
  );
}

export default App;
