import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function DashboardOverview() {
  const { transactions } = useAppContext();

  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
        } else {
          acc.expense += curr.amount;
        }
        acc.balance = acc.income - acc.expense;
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="dashboard-grid">
      <div className="card summary-card">
        <div className="summary-icon blue">
          <Wallet size={28} />
        </div>
        <div className="summary-info">
          <h3>Total Balance</h3>
          <p>{formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="card summary-card">
        <div className="summary-icon green">
          <TrendingUp size={28} />
        </div>
        <div className="summary-info">
          <h3>Total Income</h3>
          <p>{formatCurrency(income)}</p>
        </div>
      </div>

      <div className="card summary-card">
        <div className="summary-icon red">
          <TrendingDown size={28} />
        </div>
        <div className="summary-info">
          <h3>Total Expenses</h3>
          <p>{formatCurrency(expense)}</p>
        </div>
      </div>
    </div>
  );
}
