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
import { Package, AlertTriangle, Clock, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';
import '../index.css';

const Dashboard = () => {
    // Mock Data - Summary Cards
    const summaryData = [
        { title: 'Total Products', value: '1,034', icon: Package, color: '#3b82f6' },
        { title: 'Low Stock', value: '12', icon: AlertTriangle, color: '#ef4444' }, // Red for alert
        { title: 'Expiring Soon', value: '5', icon: Clock, color: '#f59e0b' }, // Orange for warning
        { title: "Today's Sales", value: 'RM 2,450', icon: DollarSign, color: '#10b981' }, // Green for money
    ];

    // Mock Data - Priority Alerts
    const lowStockItems = [
        { name: 'Ray-Ban RB123', qty: 4 },
        { name: 'Vogue VG223', qty: 3 },
        { name: 'Acuvue Oasys', qty: 2 },
    ];

    const expiringItems = [
        { name: 'SoftLens Daily', date: '12 Feb' },
        { name: 'Biofinity Monthly', date: '15 Feb' },
    ];

    // Mock Data - Sales Insights
    const topProduct = { name: 'Ray-Ban RB5154', sold: '28 units' };
    const slowProduct = { name: 'Vogue VG992', sold: '2 units' };

    // Mock Data - Stock Flow Chart
    const stockFlowData = [
        { name: 'Mon', sales: 40, purchase: 60 },
        { name: 'Tue', sales: 50, purchase: 70 },
        { name: 'Wed', sales: 60, purchase: 80 },
        { name: 'Thu', sales: 70, purchase: 50 },
        { name: 'Fri', sales: 80, purchase: 90 },
        { name: 'Sat', sales: 90, purchase: 100 },
        { name: 'Sun', sales: 100, purchase: 110 },
    ];

    return (
        <div className="dashboard-container">
            {/* 1. Top Summary Cards (4 Columns) */}
            <div className="stats-grid-4">
                {summaryData.map((item, index) => (
                    <div className="stat-card" key={index}>
                        <div className="stat-icon-wrapper" style={{ backgroundColor: `${item.color}15` }}>
                            <item.icon size={28} color={item.color} />
                        </div>
                        <div className="stat-content">
                            <span className="stat-label">{item.title}</span>
                            <span className="stat-value">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 2. Middle Section: Priority Alerts & Sales Insights */}
            <div className="dashboard-mid-grid">

                {/* Priority Alerts */}
                <div className="card alert-card">
                    <h3 className="card-title">
                        <div className="flex-center-gap">
                            <AlertCircle size={20} className="text-red" />
                            Priority Alerts
                        </div>
                    </h3>

                    <div className="alert-section">
                        <h4 className="alert-subtitle text-red">Low Stock</h4>
                        <ul className="alert-list">
                            {lowStockItems.map((item, idx) => (
                                <li key={idx} className="alert-item">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-badge danger">{item.qty} left</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="divider-h"></div>

                    <div className="alert-section">
                        <h4 className="alert-subtitle text-orange">Expiring Soon</h4>
                        <ul className="alert-list">
                            {expiringItems.map((item, idx) => (
                                <li key={idx} className="alert-item">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-badge warning">{item.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Sales Insights */}
                <div className="card insight-card">
                    <h3 className="card-title">
                        <div className="flex-center-gap">
                            <TrendingUp size={20} className="text-blue" />
                            Sales Insights
                        </div>
                    </h3>

                    <div className="insight-row">
                        <div className="insight-box best-seller">
                            <span className="insight-label">Top Product</span>
                            <div className="insight-main">{topProduct.name}</div>
                            <span className="insight-sub">{topProduct.sold} sold</span>
                        </div>
                    </div>

                    <div className="insight-row">
                        <div className="insight-box slow-mover">
                            <span className="insight-label">Slow Item</span>
                            <div className="insight-main">{slowProduct.name}</div>
                            <span className="insight-sub">{slowProduct.sold} sold</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Section: Stock Movement Chart */}
            <div className="card chart-section">
                <h3 className="card-title">Stock Movement (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stockFlowData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: '#f3f4f6' }} />
                        <Legend iconType="circle" />
                        <Bar dataKey="sales" name="Sales" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar dataKey="purchase" name="Stock In" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;

const styles = `
/* Dashboard New Layout Styles */
.dashboard-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.stats-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
}

.stat-content {
    display: flex;
    flex-direction: column;
}

.stat-label {
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 4px;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
}

.dashboard-mid-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
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
    align-items: center;
}

.flex-center-gap {
    display: flex;
    align-items: center;
    gap: 10px;
}

.text-red { color: #ef4444; }
.text-orange { color: #f59e0b; }
.text-blue { color: #3b82f6; }
.text-green { color: #10b981; }

/* Alert Section Styles */
.alert-section {
    margin-bottom: 24px;
}

.alert-section:last-child {
    margin-bottom: 0;
}

.alert-subtitle {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
}

.alert-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.alert-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--glass-border);
    font-size: 0.95rem;
}

.alert-item:last-child {
    border-bottom: none;
}

.item-name {
    color: var(--text-main);
    font-weight: 500;
}

.item-badge {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
}

.item-badge.danger {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.item-badge.warning {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
}

.divider-h {
    height: 1px;
    background: var(--glass-border);
    margin: 16px 0;
}

/* Insights Styles */
.insight-row {
    margin-bottom: 20px;
}

.insight-row:last-child {
    margin-bottom: 0;
}

.insight-box {
    background: var(--bg-main);
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    border: 1px solid transparent;
    transition: all 0.2s;
}

.insight-box.best-seller {
    border-color: rgba(16, 185, 129, 0.2);
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%);
}

.insight-box.slow-mover {
    border-color: rgba(239, 68, 68, 0.2);
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%);
}

.insight-label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.insight-main {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 4px;
}

.insight-sub {
    font-size: 0.9rem;
    color: var(--text-muted);
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
