import { AddTransactionForm } from "../components/AddTransactionForm";
import { Balance } from "../components/Balance";
import { Header } from "../components/Header";
import { TransactionList } from "../components/TransactionList";

export const DashboardPage = () => {
  return (
    <div className="p-4">
      <Header />
      <Balance />
      <TransactionList />
      <AddTransactionForm />
    </div>
  );
};
