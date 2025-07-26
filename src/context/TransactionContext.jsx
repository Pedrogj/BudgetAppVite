import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../api/supabase";
import { useAuth } from "./AuthContext";

// context
const TransactionContext = createContext();

// Hook
export const useTransactions = () => useContext(TransactionContext);

// Provider
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  // Loading transactions from database
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!user) return;
        setLoading(true);

        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error al cargar transacciones:", error.message);
          return;
        }

        setTransactions(data);
      } catch (err) {
        console.error("Error inesperado al cargar transacciones:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user]);

  // Add transaction
  const addTransaction = async (transaction) => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([transaction])
        .select();

      if (error) {
        console.error("Error al agregar transacción", error.message);
        throw error;
      }

      if (data && data.length > 0) {
        setTransactions((prev) => [data[0], ...prev]);
      }
    } catch (err) {
      console.error("Error inesperado al agregar transacción", err.message);
      throw err;
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
