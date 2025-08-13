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
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { user, authLoading } = useAuth();

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
    if (!authLoading && user) {
      fetchTransactions();
    }
  }, [user, authLoading]);

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

  const selectTransaction = async (id) => {
    try {
      let transaction = transactions.find(
        (transactionId) => transactionId.id === id
      );

      if (!transaction) {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw new Error(error.message);

        transaction = data;
      }

      setSelectedTransaction(transaction || null);
    } catch (err) {
      console.error("Error al cargar transacción:", error.message);
      setSelectedTransaction(null);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        loading,
        selectedTransaction,
        selectTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
