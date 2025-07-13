import { useState } from "react";
import toast from "react-hot-toast";
import { useTransactions } from "../context/TransactionContext";
import { useAuth } from "../context/AuthContext";

export const AddTransactionForm = () => {
  const { addTransaction } = useTransactions();
  const { user } = useAuth();

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // formate YYY-MMM-DD
  });
  const [type, setType] = useState("Ingreso");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !amount) {
      toast.error("Debes completar descripcion y monto");
      return;
    }

    const formattedAmount = parseFloat(amount.replace(/\./g, ""));

    const newTransaction = {
      text,
      amount:
        type === "gasto"
          ? -Math.abs(formattedAmount)
          : Math.abs(formattedAmount),
      category,
      type,
      date,
      user_id: user.id,
    };

    setSubmitting(true);

    try {
      await addTransaction(newTransaction);

      setText("");
      setAmount("");
      setCategory("General");
      setType("Ingreso");
      setDate(new Date().toISOString().split("T")[0]);

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
      <h3 className="text-lg font-semibold">Agregar Transacción</h3>

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
          type="number"
          value={amount}
          onChange={(e) => {
            const raw = e.target.value
              .replace(/\./g, "")
              .replace(/[^0-9\-]/g, "");
            const formatted = parseInt(raw || "0").toLocaleString("es-CL");
            setAmount(formatted);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* category */}
      <div>
        <label className="block mb-1 text-sm font-medium">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="General">General</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Renta">Renta</option>
          <option value="Comida">Comida</option>
          <option value="Ocio">Ocio</option>
          <option value="Compras">Compras</option>
          <option value="Sueldo">Sueldo</option>
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

      {/* Date */}
      <div>
        <label className="block mb-1 text-sm font-medium">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Button submit */}
      <button
        type="submit"
        className="
        bg-green-600 
        text-white 
        px-4 
        py-2 
        rounded 
        hover:bg-green-700 
        transition 
        cursor-pointer 
        w-full 
        lg:w-1/3
        disabled:opacity-50"
      >
        {submitting ? "Agregando..." : "Agregar Transacción"}
      </button>
    </form>
  );
};
