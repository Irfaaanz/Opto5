import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, AlertTriangle, DollarSign, Calendar } from 'lucide-react';
import '../index.css';

import Breadcrumb from '../components/Breadcrumb';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'sales'

    // Mock Data - Inventory Report
    const inventoryStats = {
        totalProducts: 350,
        lowStock: 12,
        expiring: 5,
        totalValue: 'RM45,000'
    };

    const inventoryTable = [
        { product: 'Ray-Ban RB5154 Black', qty: 12, status: 'Normal', type: 'Frame' },
        { product: 'Vogue Brown Frame', qty: 4, status: 'Low Stock', type: 'Frame' },
        { product: 'Acuvue Oasys 1-Day', qty: 20, status: 'Normal', type: 'Contact' },
        { product: 'Hoya BlueControl', qty: 2, status: 'Low Stock', type: 'Lens' },
        { product: 'Biofinity Monthly', qty: 25, status: 'Normal', type: 'Contact' },
    ];

    // Mock Data - Sales Summary
    const salesStats = {
        totalMonth: 'RM18,500',
        itemsSold: 120,
        topProduct: 'RB123',
        leastSold: 'VG223'
    };

    const monthlySalesData = [
        { name: 'Jan', sales: 12000 },
        { name: 'Feb', sales: 15000 },
        { name: 'Mar', sales: 18500 },
        { name: 'Apr', sales: 14000 },
        { name: 'May', sales: 20000 },
        { name: 'Jun', sales: 18500 },
    ];

    const topSellingData = [
        { name: 'RB123 Black', sales: 45 },
        { name: 'SoftLens A', sales: 30 },
        { name: 'VG223 Brown', sales: 15 },
    ];

    return (
        <div className="reports-container">
            <Breadcrumb currentPage="Reports" />
            <h1 className="page-title">Reports</h1>

            {/* Tab Navigation */}
            <div className="reports-tabs">
                <button
                    className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inventory')}
                >
                    <Package size={18} />
                    <span>Inventory Report</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'sales' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sales')}
                >
                    <TrendingUp size={18} />
                    <span>Sales Summary</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="reports-content">
                {activeTab === 'inventory' ? (
                    <div className="fade-in">
                        {/* Summary Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon bg-blue-100 text-blue-600"><Package size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Products</span>
                                    <span className="stat-value">{inventoryStats.totalProducts}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon bg-red-100 text-red-600"><AlertTriangle size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Low Stock Items</span>
                                    <span className="stat-value">{inventoryStats.lowStock}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon bg-orange-100 text-orange-600"><Calendar size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Expiring Lenses</span>
                                    <span className="stat-value">{inventoryStats.expiring}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon bg-green-100 text-green-600"><DollarSign size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Valuation</span>
                                    <span className="stat-value">{inventoryStats.totalValue}</span>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Table */}
                        <div className="card mt-6">
                            <div className="card-header-plain">
                                <h3>Stock Status Overview</h3>
                            </div>
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventoryTable.map((item, index) => (
                                        <tr key={index}>
                                            <td className="font-medium text-main">{item.product}</td>
                                            <td className="font-bold">{item.qty}</td>
                                            <td>
                                                <span className={`status-badge ${item.status === 'Low Stock' ? 'status-danger' : 'status-success'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>{item.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="fade-in">
                        {/* Sales Summary Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon bg-purple-100 text-purple-600"><DollarSign size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Total Sales (Month)</span>
                                    <span className="stat-value">{salesStats.totalMonth}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon bg-blue-100 text-blue-600"><TrendingUp size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Items Sold</span>
                                    <span className="stat-value">{salesStats.itemsSold}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon bg-green-100 text-green-600"><Package size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Top Product</span>
                                    <span className="stat-value md-text">{salesStats.topProduct}</span>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon bg-gray-100 text-gray-600"><Package size={24} /></div>
                                <div className="stat-info">
                                    <span className="stat-label">Least Sold</span>
                                    <span className="stat-value md-text">{salesStats.leastSold}</span>
                                </div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="charts-grid mt-6">
                            <div className="card chart-card">
                                <h3>Monthly Sales Trend</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={monthlySalesData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                                        <XAxis dataKey="name" stroke="var(--text-muted)" />
                                        <YAxis stroke="var(--text-muted)" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--glass-border)', color: 'var(--text-main)' }}
                                            itemStyle={{ color: 'var(--text-main)' }}
                                        />
                                        <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="card chart-card">
                                <h3>Top Selling Products</h3>
                                <div className="top-products-list">
                                    {topSellingData.map((item, index) => (
                                        <div key={index} className="top-product-item">
                                            <div className="product-info">
                                                <span className="rank">#{index + 1}</span>
                                                <span className="name">{item.name}</span>
                                            </div>
                                            <div className="sales-bar-container">
                                                <div className="sales-bar" style={{ width: `${(item.sales / 50) * 100}%` }}></div>
                                            </div>
                                            <span className="count">{item.sales} sold</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;

const styles = `
.reports-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
}

.reports-tabs {
    display: flex;
    gap: 16px;
    border-bottom: 2px solid var(--glass-border);
    padding-bottom: 2px;
}

.reports-content {
    min-height: 500px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
}

.stat-card {
    background: var(--bg-card);
    padding: 24px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    gap: 16px;
    border: 1px solid var(--glass-border);
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-label {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 600;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
}

.md-text {
    font-size: 1.2rem;
}

.mt-6 { margin-top: 24px; }

.card-header-plain {
    padding: 0 0 16px 0;
    margin-bottom: 0;
}

.card-header-plain h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
}

.charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
}

.chart-card {
    padding: 24px;
    min-height: 400px;
}

.chart-card h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 24px;
}

.top-products-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.top-product-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.product-info {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 140px;
}

.rank {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-muted);
    width: 24px;
}

.name {
    font-weight: 600;
    color: var(--text-main);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sales-bar-container {
    flex: 1;
    height: 8px;
    background: var(--bg-main);
    border-radius: 4px;
    overflow: hidden;
}

.sales-bar {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #6366f1);
    border-radius: 4px;
}

.count {
    width: 80px;
    text-align: right;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-muted);
}

/* Colors for stats */
.bg-blue-100 { background: rgba(59, 130, 246, 0.15); }
.text-blue-600 { color: #2563eb; }

.bg-red-100 { background: rgba(239, 68, 68, 0.15); }
.text-red-600 { color: #dc2626; }

.bg-orange-100 { background: rgba(245, 158, 11, 0.15); }
.text-orange-600 { color: #d97706; }

.bg-green-100 { background: rgba(16, 185, 129, 0.15); }
.text-green-600 { color: #059669; }

.bg-purple-100 { background: rgba(124, 58, 237, 0.15); }
.text-purple-600 { color: #7c3aed; }

.bg-gray-100 { background: rgba(71, 85, 105, 0.15); }
.text-gray-600 { color: #475569; }

.fade-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
