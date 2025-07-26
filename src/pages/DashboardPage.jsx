import { Toaster } from "react-hot-toast";

import { AddTransactionForm } from "../components/AddTransactionForm";
import { Balance } from "../components/Balance";
import { TransactionList } from "../components/TransactionList";
import { Navbar } from "../components/Navbar";

export const DashboardPage = () => {
  return (
    <div className="mx-auto max-w-md overflow-hidden bg-white md:max-w-2xl p-4">
      <Toaster position="top-center" />
      <Navbar />
      <Balance />
      <AddTransactionForm />
      <TransactionList />
    </div>
  );
};
