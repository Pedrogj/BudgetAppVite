import { Toaster } from "react-hot-toast";

import { AddTransactionForm } from "../components/AddTransactionForm";
import { Balance } from "../components/Balance";
import { TransactionList } from "../components/TransactionList";
import { useTransactions } from "../context/TransactionContext";
import { LoadingScreen } from "../components/LoadingScreen";

export const DashboardPage = () => {
  const { loading } = useTransactions();

  return (
    <>
      {loading ? <LoadingScreen /> : null}
      <Toaster position="top-center" />
      <Balance />
      <AddTransactionForm />
      <TransactionList />
    </>
  );
};
