import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

export const CategoryList = () => {
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { categories, loading, addCategory } = useTransactions();

  const validateCategory = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("El nombre de la categoría no puede estar vacío.");
      return null;
    }
    return trimmed;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const trimmedCategory = validateCategory(newCategory);
    if (!trimmedCategory) return;

    try {
      setSubmitting(true);
      setError(null);
      await addCategory(trimmedCategory);
      setNewCategory("");
    } catch (err) {
      console.error("Error al agregar categoría:", err.message);
      setError("Error al agregar categoría. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Cargando categorías...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-4 animate-fadeIn">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Categorías</h2>

      {error && (
        <p className="text-red-600 font-medium mb-2" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-violet-200 outline-none"
          aria-label="Nueva categoría"
        />
        <button
          type="submit"
          className={`bg-violet-800 text-white px-4 py-2 rounded w-full lg:w-1/3 
                     hover:bg-violet-700 transition cursor-pointer shadow-md ${
                       !newCategory.trim() || submitting
                         ? "opacity-50 cursor-not-allowed"
                         : "hover:bg-violet-700"
                     }`}
        >
          {submitting ? "Agregando..." : "Agregar"}
        </button>
      </form>

      {categories.length === 0 ? (
        <p className="text-gray-500">
          No hay categorías disponibles, empieza a crearlas.
        </p>
      ) : (
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id} className="p-2 border-b border-gray-200">
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
