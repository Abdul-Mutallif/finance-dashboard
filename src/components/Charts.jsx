import React, { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend
} from 'recharts';
import { useAppContext } from '../context/AppContext';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Charts() {
  const { transactions, theme } = useAppContext();
  const isDark = theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  const { trendData, pieData } = useMemo(() => {
    // Sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const balanceTrend = [];
    let currentBalance = 0;
    
    const expensesByCategory = {};

    sorted.forEach((t) => {
      if (t.type === 'income') {
        currentBalance += t.amount;
      } else {
        currentBalance -= t.amount;
        if (!expensesByCategory[t.category]) expensesByCategory[t.category] = 0;
        expensesByCategory[t.category] += t.amount;
      }
      balanceTrend.push({
        date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: currentBalance
      });
    });

    const expensesFormat = Object.keys(expensesByCategory).map(key => ({
      name: key,
      value: expensesByCategory[key]
    }));

    return { trendData: balanceTrend, pieData: expensesFormat };
  }, [transactions]);

  return (
    <div className="charts-grid">
      <div className="card">
        <div className="chart-header">
          <h3>Balance Trend</h3>
        </div>
        <div className="chart-container">
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <LineTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', borderRadius: '8px', border: `1px solid ${gridColor}` }}
                  itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
                />
                <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>No data to display.</p>
          )}
        </div>
      </div>

      <div className="card">
        <div className="chart-header">
          <h3>Expenses by Category</h3>
        </div>
        <div className="chart-container">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', borderRadius: '8px', border: `1px solid ${gridColor}` }}
                  itemStyle={{ color: isDark ? '#f8fafc' : '#0f172a' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', color: textColor }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '2rem' }}>No expenses logged.</p>
          )}
        </div>
      </div>
    </div>
  );
}
