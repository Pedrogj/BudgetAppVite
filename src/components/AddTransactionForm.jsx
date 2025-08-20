import { useState } from "react";
import toast from "react-hot-toast";
import { useTransactions } from "../context/TransactionContext";
import { useAuth } from "../context/AuthContext";

export const AddTransactionForm = () => {
  const { addTransaction, categories } = useTransactions();
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState("Ingreso");
  const [submitting, setSubmitting] = useState(false);

  const disabledButton = !text || !amount || !categoryId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (disabledButton) {
      toast.error("Debes completar descripcion y monto");
      return;
    }

    const formattedAmount = parseFloat(amount.replace(/\./g, ""));

    const date = new Date();
    const dateLocal = date.toLocaleDateString("es-CL");

    const newTransaction = {
      text,
      amount:
        type === "gasto"
          ? -Math.abs(formattedAmount)
          : Math.abs(formattedAmount),
      category_id: categoryId,
      type,
      date: dateLocal,
      user_id: user.id,
    };

    setSubmitting(true);

    try {
      await addTransaction(newTransaction);

      setText("");
      setAmount("");
      setCategoryId("");
      setType("Ingreso");

      toast.success("Transacción agregada correctamente");
    } catch (error) {
      toast.error("Ocurrió un error al agregar la transacción");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <h3 className="text-lg font-semibold text-gray-600">
        Agregar Transacción
      </h3>

      {/* description */}
      <div>
        <label className="block mb-1 text-sm font-medium">Descripción</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* amount */}
      <div>
        <label className="block mb-1 text-sm font-medium">Monto</label>
        <input
          type="text"
          inputMode="numeric"
          value={amount}
          onChange={(e) => {
            const raw = e.target.value
              .replace(/\./g, "")
              .replace(/[^0-9\-]/g, "");
            const formatted = raw ? parseInt(raw).toLocaleString("es-CL") : "";
            setAmount(formatted);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* category */}
      <div>
        <label className="block mb-1 text-sm font-medium">Categoría</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Selecciona una Categoría</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="block mb-1 text-sm font-medium">Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
      </div>

      {/* Button submit */}
      <button
        type="submit"
        className="
        bg-violet-800 
        text-white 
        px-4 
        py-2 
        rounded 
        hover:bg-violet-700 
        transition 
        cursor-pointer 
        w-full 
        lg:w-1/3
        disabled:opacity-50"
        disabled={disabledButton}
      >
        {submitting ? "Agregando..." : "Agregar Transacción"}
      </button>
    </form>
  );
};
