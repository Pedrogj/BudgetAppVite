import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";
import { LoadingScreen } from "../components/LoadingScreen";

export const TransactionDetailPage = () => {
  const { id } = useParams();
  const { selectedTransaction, selectTransaction } = useTransactions();
  const navigate = useNavigate();

  const { amount, text, date, categories } = selectedTransaction;

  const navigateTrsansaction = () => {
    navigate(-1);
  };

  useEffect(() => {
    selectTransaction(id);
  }, [id]);

  if (!selectedTransaction) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-4 bg-white rounded shadow animate-fadeIn">
      <h2 className="text-xl font-bold mb-2">Detalle de transacción</h2>

      <div className="flex gap-2">
        <p className="font-medium">Monto:</p>
        <p className={amount >= 0 ? "text-green-600" : "text-red-600"}>
          {amount >= 0 ? "+" : "-"}${Math.abs(amount).toLocaleString("es-CL")}
        </p>
      </div>
      <div className="flex gap-2">
        <p className="font-medium">Descripción:</p>
        <p>{text}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-medium">Categoría:</p>
        <p>{categories?.name || "Sin categoría"}</p>
      </div>
      <div className="flex gap-2">
        <p className="font-medium">Fecha:</p>
        {date}
      </div>
      <button
        className="cursor-pointer mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={navigateTrsansaction}
      >
        Regresar
      </button>
    </div>
  );
};
