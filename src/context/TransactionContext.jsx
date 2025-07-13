import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../api/supabase";

// context
const TransactionContext = createContext();

// Hook
export const useTransactions = () => useContext(TransactionContext);

// Provider
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Loading transactions from database
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .order("date", { ascending: false });

        if (error) {
          console.error("Error al cargar transacciones:", error.message);
          return;
        }
        console.log({ data });
        setTransactions(data);
      } catch (err) {
        console.error("Error inesperado al cargar transacciones:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Add transaction
  const addTransaction = async (transaction) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([transaction])
        .select();

      if (error) {
        console.log("Error al agregar transacción", error.message);
        return;
      }

      if (data && data.length > 0) {
        setTransactions((prev) => [data[0], ...prev]);
      }
    } catch (err) {
      console.log("Error inesperado al agregar transacción", err.message);
    }
  };

  // Delete Transaction
  const deleteTransaction = async (id) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error al eliminar transacción:", error.message);
        return;
      }

      setTransactions((transaction) =>
        transaction.filter((trc) => trc.id !== id)
      );
    } catch (err) {
      console.error("Error inesperado al eliminar transacción", err.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
