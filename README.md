<h1 align="center" style="font-family: 'Poppins', sans-serif;">
  <br>
  🏦 FinanceFlow Dashboard
  <br>
</h1>

<h4 align="center">A high-performance modern, responsive, and dynamic web-based finance management application built with React and Vite.</h4>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#key-components">Key Components</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

---

<img src="https://github.com/user-attachments/assets/c90be68d-8c11-4712-a72a-9cb8c1e4051b" width="100%" alt="FinanceFlow Dashboard Preview"/>

## ✨ Features

- **📊 Comprehensive Visualizations**: Interactive pie charts and trend lines powered by Recharts.
- **🌗 Light & Dark Mode**: Seamlessly toggle between aesthetically pleasing light and dark user interfaces out-of-the-box.
- **🛡️ Role-Based Access Control**:
  - **Viewer**: Read-only access to insights and trends.
  - **Admin**: Full authority to create, edit, filter, export, and delete financial records.
- **📱 Fully Responsive**: Custom built CSS tailored perfectly for desktop, tablet, and mobile environments—no overflow issues!
- **💵 Real-time Calculations**: Immediately processes expenses, income, and overall balances without requiring page reloads.
- **📥 CSV Exporting**: Export filtered records with a single click.

## 🛠️ Tech Stack

* **Core Framework:** [React.js](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** Vanilla CSS3 with standard CSS variables
* **Icons:** [Lucide React](https://lucide.dev/)
* **Charts:** [Recharts](https://recharts.org/)

## 🚀 How To Use

To clone and run this application locally, you will need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. 

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/abdul-mutallif/finance-dashboard.git

# Go into the repository
$ cd finance-dashboard

# Install dependencies
$ npm install

# Start the development server
$ npm run dev
```

> **Note**: Your app will start on `localhost:5173` (default Vite port).

## 🧩 Key Components

- **`DashboardOverview`**: Quick-glance metrics for Total Balance, Income, and Expenses.
- **`Charts`**: Time-series charts and expense breakdowns to visually understand your spending behaviors. 
- **`TransactionsTable`**: Powerful data grid matching category filtering and sortable column headers. 
- **`Header & AppContext`**: Global managing for overarching application state (Theme, Global User Roles, Data).

## 📄 License

This project is created by **[Abdul Mutallif](https://github.com/abdul-mutallif)**. All rights reserved.
