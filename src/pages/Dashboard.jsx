import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { List, ClipboardList, CheckSquare } from 'lucide-react';
import '../index.css';

const Dashboard = () => {
    // Mock Data
    const monthlySalesData = [
        { name: '30% Rounded Spectacles', value: 45, color: '#4ade80' }, // Green
        { name: '40% Lenses', value: 60, color: '#fbbf24' },        // Yellow
        { name: '30% Luxury Spectacles', value: 45, color: '#3b82f6' }, // Blue
    ];

    const stockFlowData = [
        { name: 'Mon', sales: 40, purchase: 60 },
        { name: 'Tue', sales: 50, purchase: 70 },
        { name: 'Wed', sales: 60, purchase: 80 },
        { name: 'Thu', sales: 70, purchase: 50 },
        { name: 'Fri', sales: 80, purchase: 90 },
        { name: 'Sat', sales: 90, purchase: 100 },
        { name: 'Sun', sales: 100, purchase: 110 },
    ];

    const stockAlerts = [
        { code: '87305928', product: 'Smartphone', warehouse: 'Warehouse 02', quantity: '05', alert: '10' },
        { code: '87309912', product: 'Mask', warehouse: 'Warehouse 02', quantity: '10', alert: '05' },
        { code: '87305452', product: 'Laptop', warehouse: 'Warehouse 01', quantity: '100', alert: '05' },
        { code: '87305231', product: 'Earphone', warehouse: 'Warehouse 03', quantity: '10', alert: '50' },
        { code: '87305452', product: 'Laptop', warehouse: 'Warehouse 01', quantity: '100', alert: '05' },
    ];

    const recentSales = [
        { ref: '87305928', customer: 'Jhon Doe', status: 'Completed', total: '$1200.00', paid: '$1200.00', due: '$00.00', pStatus: 'Paid' },
        { ref: '87305929', customer: 'Angela Carter', status: 'Incomplete', total: '$1450.00', paid: '$1000.00', due: '$450.00', pStatus: 'Due' },
        { ref: '87305927', customer: 'Victor James', status: 'Completed', total: '$1200.00', paid: '$1200.00', due: '$00.00', pStatus: 'Paid' },
    ];

    return (
        <div className="dashboard-container">
            {/* Stats Cards Row */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <List size={32} color="#3b82f6" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Product</span>
                        <span className="stat-value">1,034</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <ClipboardList size={32} color="#1e293b" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Inventories</span>
                        <span className="stat-value">2,048</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <CheckSquare size={32} color="#3b82f6" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Sales</span>
                        <span className="stat-value">RM 10,324</span>
                    </div>
                </div>
            </div>

            {/* Main Grid: Stock Alert (Left) + Charts (Right) */}
            <div className="dashboard-content-grid">
                {/* Left Column: Stock Alert */}
                <div className="card stock-alert-card">
                    <h3 className="card-title">Stock Alert</h3>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>CODE</th>
                                <th>PRODUCT</th>
                                <th>WAREHOUSE</th>
                                <th>QUANTITY</th>
                                <th>ALERT QUANTITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockAlerts.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-muted">{item.code}</td>
                                    <td>{item.product}</td>
                                    <td className="text-muted">{item.warehouse}</td>
                                    <td>{item.quantity}</td>
                                    <td className="text-red">{item.alert}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right Column: Charts */}
                <div className="charts-column">
                    {/* Monthly Sales */}
                    <div className="card chart-card">
                        <h3 className="card-title">Monthly Sales <span className="text-sm font-normal text-muted">Total Sales per Month</span></h3>
                        <div className="chart-wrapper flex-center">
                            <div className="pie-chart-container">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={monthlySalesData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {monthlySalesData.map((entry, index) => (
                                                <Cell key={'cell-' + index} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        {/* Center Label for Pie Chart */}
                                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                                            <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="#333">45</tspan>
                                        </text>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="chart-legend">
                                {monthlySalesData.map((item, idx) => (
                                    <div key={idx} className="legend-item">
                                        <span className="dot" style={{ background: item.color }}></span>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stock Flow - Bar Chart */}
                    <div className="card chart-card">
                        <h3 className="card-title">This Weeks Sales & Purchases</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={stockFlowData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip />
                                <Legend iconType="square" />
                                <Bar dataKey="sales" fill="#4ade80" radius={[4, 4, 0, 0]} barSize={12} />
                                <Bar dataKey="purchase" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Sales Table */}
            <div className="card mt-6">
                <h3 className="card-title">Recent Sales</h3>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>REFERENCE</th>
                            <th>CUSTOMER</th>
                            <th>STATUS</th>
                            <th>GRAND TOTAL</th>
                            <th>PAID</th>
                            <th>DUE</th>
                            <th>PAYMENT STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentSales.map((item, index) => (
                            <tr key={index}>
                                <td className="text-link">{item.ref}</td>
                                <td>{item.customer}</td>
                                <td>
                                    <span className={'badge-status ' + (item.status === 'Completed' ? 'success' : 'warning')}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>{item.total}</td>
                                <td>{item.paid}</td>
                                <td>{item.due}</td>
                                <td>
                                    <span className={'badge-outline ' + (item.pStatus === 'Paid' ? 'success' : 'danger')}>
                                        {item.pStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;

const styles = `
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.stat-card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: var(--bg-main); /* Adaptive bg */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-main);
}

.dashboard-content-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr; /* 60/40 split roughly */
  gap: 24px;
}

.charts-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th {
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--table-header-color);
  text-transform: uppercase;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--table-border-color);
}

.custom-table td {
  padding: 16px 0;
  font-size: 0.9rem;
  color: var(--table-text-color);
  border-bottom: 1px solid var(--table-border-color);
}

.custom-table tr:last-child td {
  border-bottom: none;
}

.text-muted { color: var(--text-muted) !important; }
.text-red { color: #ef4444; font-weight: 600; }
.text-link { color: #3b82f6; cursor: pointer; }

.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pie-chart-container {
  flex: 1;
  height: 200px;
  position: relative;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-left: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.badge-status {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
}
.badge-status.success { background: #dcfce7; color: #166534; }
.badge-status.warning { background: #fee2e2; color: #991b1b; } /* Using red for incomplete based on img */

.badge-outline {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid;
}
.badge-outline.success { border-color: #10b981; color: #10b981; }
.badge-outline.danger { border-color: #ef4444; color: #ef4444; }

.mt-6 { margin-top: 24px; }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
