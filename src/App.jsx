import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import Charts from './components/Charts';
import TransactionsTable from './components/TransactionsTable';
import TransactionForm from './components/TransactionForm';
import Insights from './components/Insights';
import './App.css';

function Dashboard() {
  const [formData, setFormData] = useState({ isOpen: false, data: null });

  const handleOpenForm = (data = null) => {
    setFormData({ isOpen: true, data });
  };

  const handleCloseForm = () => {
    setFormData({ isOpen: false, data: null });
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <DashboardOverview />
        <Charts />
        
        <div className="content-grid">
          <TransactionsTable 
            onOpenForm={() => handleOpenForm()} 
            onEditForm={(data) => handleOpenForm(data)} 
          />
          <Insights />
        </div>
      </main>

      {formData.isOpen && (
        <TransactionForm onClose={handleCloseForm} initialData={formData.data} />
      )}

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Abdul Mutallif. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
