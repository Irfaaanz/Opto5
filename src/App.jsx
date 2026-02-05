import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Accounts from './pages/Accounts';
import Inventory from './pages/Inventory';
import StockFlow from './pages/StockFlow';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import History from './pages/History';

// Dashboard component is imported above

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/stock-flow" element={<StockFlow />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/history" element={<History />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
