import { AddTransactionForm } from "../components/AddTransactionForm";
import { Balance } from "../components/Balance";
import { Header } from "../components/Header";
import { TransactionList } from "../components/TransactionList";
import { Toaster } from "react-hot-toast";
import { LogoutButton } from "../components/layout/LogoutButton";

export const DashboardPage = () => {
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
