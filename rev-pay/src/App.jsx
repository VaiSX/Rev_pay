import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="text-4xl font-bold text-center my-8">Bank Account Management</h1>
          <nav className="text-center">
            <Link to="/register" className="mx-2 text-blue-500">Register</Link>
            <Link to="/login" className="mx-2 text-blue-500">Login</Link>
            <Link to="/dashboard" className="mx-2 text-blue-500">Dashboard</Link>
            <Link to="/create-account" className="mx-2 text-blue-500">Create Account</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="/dashboard" element={<DashboardPage token={token} />} />
            <Route path="/create-account" element={<CreateAccount token={token} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
