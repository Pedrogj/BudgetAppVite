import { Toaster } from "react-hot-toast";

import { AddTransactionForm } from "../components/AddTransactionForm";
import { Balance } from "../components/Balance";
import { TransactionList } from "../components/TransactionList";
import { Navbar } from "../components/Navbar";

export const DashboardPage = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Balance />
      <AddTransactionForm />
      <TransactionList />
    </>
  );
};
