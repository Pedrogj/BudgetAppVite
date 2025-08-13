import { useState } from "react";
import { Link } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";

export const TransactionList = () => {
  const [selectedId, setSelectedId] = useState(null); // ID de la transaccion a eliminar
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-600">Historial</h3>
      <ul className="space-y-3">
        {transactions.map((transaction) => (
          <Link
            to={`/transaction/${transaction.id}`}
            key={transaction.id}
            className={`flex justify-between items-center border-l-4 rounded-md shadow-sm p-3
              ${
                transaction.amount >= 0
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
              }`}
          >
            <div className="flex flex-col">
              <p className="sm:text-lg sm:font-medium text-xs">
                {transaction.text}
              </p>
              <p className="sm:text-base text-xs text-center text-gray-600">
                Fecha: {transaction.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs sm:text-base ${
                  transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {transaction.amount >= 0 ? "+" : "-"}$
                {Math.abs(transaction.amount).toLocaleString("es-CL")}
              </span>
              <button
                onClick={() => setSelectedId(transaction.id)}
                className="text-white bg-red-500 text-xs p-1 rounded cursor-pointer"
                title="Eliminar"
              >
                Eliminar
              </button>
            </div>
          </Link>
        ))}
      </ul>

      {selectedId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className="bg-white rounded-lg p-6 shadow-lg w-80 text-center
               transform transition-all duration-300 scale-95 opacity-0
               animate-fade-in"
          >
            <p className="mb-4 text-gray-800">
              ¿Estás seguro de que quieres eliminar esta transacción?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  deleteTransaction(selectedId);
                  setSelectedId(null);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setSelectedId(null)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
