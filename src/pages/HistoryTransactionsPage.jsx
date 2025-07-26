import { useTransactions } from "../context/TransactionContext";

export const HistoryTransactionsPage = () => {
  const { transactions } = useTransactions();

  return (
    <div className="max-w-3xl mx-auto py-4">
      <h1 className="text-lg font-bold mb-4 text-gray-600">
        Historial de Transacciones
      </h1>

      {transactions.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No hay transacciones registradas.
        </p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div>
                <p className="sm:text-lg sm:font-medium text-xs">
                  {transaction.text}
                </p>
                <p className="sm:text-base text-xs text-center text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`text-xs sm:text-base ${
                  transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${Math.abs(transaction.amount).toLocaleString("es-CL")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
