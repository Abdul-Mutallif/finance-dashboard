import React, { useState } from 'react';
import { Search, Filter, Trash2, PlusCircle, Edit2, Download, ArrowUpDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TransactionsTable({ onOpenForm, onEditForm }) {
  const { transactions, deleteTransaction, role } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const exportCSV = () => {
    const headers = ['Date', 'Category', 'Type', 'Amount\n'];
    const csvContent = filteredTransactions.map(t => 
      `${t.date},"${t.category}",${t.type},${t.amount}`
    ).join('\n');
    
    const blob = new Blob([headers.join(',') + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="card">
      <div className="transactions-header">
        <h3>Recent Transactions</h3>
        
        <div className="filters">
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '35px', width: '200px' }}
            />
          </div>
          
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button className="btn btn-secondary" onClick={exportCSV} title="Export CSV">
            <Download size={16} /> Export
          </button>

          {role === 'admin' && (
            <button className="btn btn-primary" onClick={onOpenForm}>
              <PlusCircle size={16} /> New Record
            </button>
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>Date <ArrowUpDown size={12} style={{ display: 'inline', marginLeft: '4px' }}/></th>
              <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>Category <ArrowUpDown size={12} style={{ display: 'inline', marginLeft: '4px' }}/></th>
              <th>Type</th>
              <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>Amount <ArrowUpDown size={12} style={{ display: 'inline', marginLeft: '4px' }}/></th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td style={{ fontWeight: 500 }}>{t.category}</td>
                  <td>
                    <span className={`badge ${t.type}`}>{t.type}</span>
                  </td>
                  <td className={`amount ${t.type}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  {role === 'admin' && (
                    <td>
                      <div className="action-btns">
                        <button className="edit" onClick={() => onEditForm(t)} title="Edit record" style={{ color: 'var(--accent-color)' }}>
                          <Edit2 size={16} />
                        </button>
                        <button className="delete" onClick={() => deleteTransaction(t.id)} title="Delete record">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
