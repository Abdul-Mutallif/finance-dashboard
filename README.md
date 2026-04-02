# Finance Dashboard

A modern, responsive, and interactive frontend finance dashboard built with React and Vite. It demonstrates solid frontend fundamentals, clean aesthetics without relying on external utility-CSS frameworks (like TailwindCSS), and effective state management using Context API and Local Storage.

## Features

- **Dashboard Overview**: Displays simple summary cards (Total Balance, Total Income, Total Expenses).
- **Interactive Visualizations**: Includes `recharts` based visualizations for Balance Trends (Line Chart) and Expense Categories (Pie Chart).
- **Transactions Management**: Complete list of initial mocked transactions with capabilities to Sort, Filter (by type/search), and Delete/Add records (Admin mode).
- **Role-based Access**: Easily switch between **Viewer Mode** (Read-only) and **Admin Mode** (Create, Delete transactions) via the top header dropdown.
- **Insights generation**: Automatically generates simple insights based on transaction history (e.g. highest spending category).
- **Dark Mode**: Integrated light and dark themes using vanilla CSS variables seamlessly.
- **State Persistence**: Transactions and theme settings are persisted in your browser's Local Storage.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Enjoy your dashboard locally at** `http://localhost:5173/`

## Tech Stack
- React
- Vite
- Recharts (Charting)
- Lucide React (Icons)
- Vanilla CSS (Theming / Layout)
