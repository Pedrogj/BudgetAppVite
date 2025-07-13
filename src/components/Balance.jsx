import { useTransactions } from "../context/TransactionContext";

export const Balance = () => {
  const { transactions } = useTransactions();

  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className="mb-4 mt-4">
      <div className="flex justify-between p-2 bg-gray-100 rounded-sm shadow-sm">
        <h2 className="text-xl font-semibold mb-1">Balance</h2>
        <p
          className={`text-2xl font-bold ${
            total >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${total.toLocaleString("es-CL")}
        </p>
      </div>
    </div>
  );
};
