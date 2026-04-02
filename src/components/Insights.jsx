import React, { useMemo } from 'react';
import { Lightbulb, AlertTriangle, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Insights() {
  const { transactions } = useAppContext();

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];
    
    let items = [];
    
    // Calculate highest spending category
    const expensesByCategory = {};
    let totalExpenses = 0;
    
    transactions.forEach(t => {
      if (t.type === 'expense') {
        if (!expensesByCategory[t.category]) expensesByCategory[t.category] = 0;
        expensesByCategory[t.category] += t.amount;
        totalExpenses += t.amount;
      }
    });

    if (totalExpenses > 0) {
       const highestCategory = Object.keys(expensesByCategory).reduce((a, b) => expensesByCategory[a] > expensesByCategory[b] ? a : b);
       items.push({
         type: 'warning',
         icon: <AlertTriangle size={20} />,
         title: 'Highest Spending',
         desc: `Your highest expense is ${highestCategory} at ${(expensesByCategory[highestCategory]).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.`
       });
    }

    // Monthly breakdown simple insight
    const currentMonth = new Date().getMonth();
    const currentMonthExpenses = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === currentMonth)
                                             .reduce((sum, t) => sum + t.amount, 0);

    items.push({
      type: 'info',
      icon: <Lightbulb size={20} />,
      title: 'Current Month Activity',
      desc: `You have spent ${currentMonthExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} so far this month.`
    });

    // Check income ratio
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    if (totalIncome > totalExpenses && totalExpenses > 0) {
      items.push({
        type: 'success',
        icon: <Star size={20} />,
        title: 'Great Job!',
        desc: 'You are spending less than you earn. Keep up the good financial habits.'
      });
    }

    return items;
  }, [transactions]);

  return (
    <div className="card">
      <h3 style={{ marginBottom: '1.5rem' }}>Automated Insights</h3>
      
      {insights.length > 0 ? (
        <div className="insights-list">
          {insights.map((insight, idx) => (
            <div className="insight-item" key={idx}>
              {insight.icon}
              <div>
                <h4>{insight.title}</h4>
                <p>{insight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>Add some transactions to see your insights.</p>
      )}
    </div>
  );
}
