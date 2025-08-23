import { useState } from "react";
import toast from "react-hot-toast";
import { useTransactions } from "../context/TransactionContext";
import { useAuth } from "../context/AuthContext";

export const AddTransactionForm = () => {
  const { addTransaction, categories } = useTransactions();
  const { user } = useAuth();

  const [form, setForm] = useState({
    text: "",
    amount: "",
    categoryId: "",
    type: "",
  });

  const { text, amount, categoryId, type } = form;

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!text.trim()) newErrors.text = "La descripcion es obligatoria.";
    if (!amount || parseFloat(amount.replace(/\./g, "")) <= 0) {
      newErrors.amount = "El monto debe ser mayor a 0.";
    }
    if (!categoryId) newErrors.categoryId = "Selecciona una categoría.";
    if (!type) newErrors.type = "Selecciona un tipo de transacción";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formattedAmount = parseFloat(amount.replace(/\./g, ""));

    const date = new Date();
    const dateLocal = date.toLocaleDateString("es-CL");

    const newTransaction = {
      text: text.trim(),
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
      setForm({ text: "", amount: "", categoryId: "", type: "" });
      setErrors({});

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
      <InputField
        label="Descripción"
        name="text"
        value={text}
        onChange={handleChange}
        error={errors.text}
      />

      {/* amount */}
      <InputField
        label="Monto"
        name="amount"
        value={amount}
        onChange={(e) => {
          const raw = e.target.value
            .replace(/\./g, "")
            .replace(/[^0-9\-]/g, "");
          setForm((prev) => ({
            ...prev,
            amount: raw ? parseInt(raw).toLocaleString("es-CL") : "",
          }));
        }}
        error={errors.amount}
      />

      {/* category */}
      <SelectField
        label="Categoría"
        name="categoryId"
        value={categoryId}
        onChange={handleChange}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        error={errors.categoryId}
      />

      {/* Type */}
      <SelectField
        label="Tipo"
        name="type"
        value={type}
        onChange={handleChange}
        options={[
          { value: "ingreso", label: "Ingreso" },
          { value: "gasto", label: "Gasto" },
        ]}
        error={errors.type}
      />

      {/* Button submit */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-violet-800 text-white px-4 py-2 rounded hover:bg-violet-700 w-full lg:w-1/3 disabled:opacity-50 transition"
      >
        {submitting ? "Agregando..." : "Agregar Transacción"}
      </button>
    </form>
  );
};

const InputField = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded px-3 py-2 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      aria-invalid={!!error}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded px-3 py-2 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      aria-invalid={!!error}
    >
      <option value="">{`Selecciona ${label}`}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
