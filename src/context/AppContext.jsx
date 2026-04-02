import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialTransactions = [
  { id: 1, date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-04-02', amount: 150, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2026-04-03', amount: 50, category: 'Transport', type: 'expense' },
  { id: 4, date: '2026-04-03', amount: 120, category: 'Utilities', type: 'expense' },
  { id: 5, date: '2026-04-04', amount: 200, category: 'Entertainment', type: 'expense' },
  { id: 6, date: '2026-04-05', amount: 800, category: 'Freelance', type: 'income' },
];

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('finance_role') || 'viewer';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('finance_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('finance_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addTransaction = (transaction) => {
    setTransactions([{ ...transaction, id: Date.now() }, ...transactions]);
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const toggleRole = () => {
    setRole(role === 'admin' ? 'viewer' : 'admin');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        theme,
        addTransaction,
        editTransaction,
        deleteTransaction,
        toggleRole,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
