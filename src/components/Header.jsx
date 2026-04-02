import React from 'react';
import { Landmark, Moon, Sun, Shield, Eye } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const { role, theme, toggleRole, toggleTheme } = useAppContext();

  return (
    <header>
      <div className="logo">
        <div className="logo-icon">
          <Landmark size={24} />
        </div>
        FinanceFlow
      </div>

      <div className="header-actions">
        <div className="role-switch" onClick={toggleRole}>
          <div className={`role-option ${role === 'viewer' ? 'active' : ''}`}>
             <Eye size={14} /> Viewer
          </div>
          <div className={`role-option ${role === 'admin' ? 'active' : ''}`}>
             <Shield size={14} /> Admin
          </div>
        </div>

        <button 
          onClick={toggleTheme} 
          className="btn btn-secondary"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          style={{ padding: '0.5rem', borderRadius: '50%' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}
