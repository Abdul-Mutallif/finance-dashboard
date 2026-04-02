import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TransactionForm({ onClose, initialData = null }) {
  const { addTransaction, editTransaction } = useAppContext();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: '',
    type: 'expense'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: new Date(initialData.date).toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) return;

    if (initialData) {
      editTransaction({
        ...initialData,
        ...formData,
        amount: parseFloat(formData.amount)
      });
    } else {
      addTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label>Category / Description</label>
            <input 
              type="text" 
              name="category" 
              placeholder="e.g. Groceries"
              value={formData.category} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (USD)</label>
            <input 
              type="number" 
              name="amount" 
              step="0.01"
              min="0"
              placeholder="0.00"
              value={formData.amount} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}
