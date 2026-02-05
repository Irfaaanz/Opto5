import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, AlertOctagon, ShoppingCart } from 'lucide-react';
import '../index.css';

import Breadcrumb from '../components/Breadcrumb';

const Alerts = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('low-stock'); // 'low-stock' or 'expiry'

    // Mock Data - Low Stock
    const lowStockItems = [
        { id: 'INV002', name: 'Vogue Brown Frame', qty: 3, min: 5 },
        { id: 'RB123', name: 'Ray-Ban RB5154 Black', qty: 4, min: 5 },
        { id: 'INV006', name: 'Hoya BlueControl Lens', qty: 2, min: 10 },
    ];

    // Mock Data - Expiry
    const expiringItems = [
        { id: 'INV004', name: 'Biofinity Monthly', qty: 20, expiry: '2026-02-25', status: 'Soon' },
        { id: 'INV007', name: 'Dailies Total1', qty: 10, expiry: '2024-01-01', status: 'Expired' },
        { id: 'AC001', name: 'Acuvue Oasys 1-Day', qty: 5, expiry: '2026-02-15', status: 'Soon' },
    ];

    const handleReorder = (item) => {
        // Navigate to Stock Flow with pre-filled intent (conceptually)
        // In a real app, we'd pass state: { productId: item.id, action: 'in' }
        navigate('/stock-flow');
    };

    return (
        <div className="alerts-container">
            <Breadcrumb currentPage="Alerts" />
            <h1 className="page-title">Alerts</h1>

            {/* Tab Navigation */}
            <div className="alerts-tabs">
                <button
                    className={`tab-btn ${activeTab === 'low-stock' ? 'active' : ''}`}
                    onClick={() => setActiveTab('low-stock')}
                >
                    <AlertTriangle size={18} />
                    <span>Low Stock</span>
                </button>
                <button
                    className={`tab-btn ${activeTab === 'expiry' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expiry')}
                >
                    <AlertOctagon size={18} />
                    <span>Expiry</span>
                </button>
            </div>

            {/* Content Area */}
            <div className="card alerts-card">
                {activeTab === 'low-stock' ? (
                    <>
                        <div className="card-header-plain">
                            <h3>Low Stock Items</h3>
                            <span className="subtitle">Items below minimum quantity level</span>
                        </div>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Current Qty</th>
                                    <th>Minimum</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lowStockItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="font-medium">{item.name} <span className="text-muted text-xs block">{item.id}</span></td>
                                        <td className="text-danger font-bold">{item.qty}</td>
                                        <td className="text-muted">{item.min}</td>
                                        <td>
                                            <button className="reorder-btn" onClick={() => handleReorder(item)}>
                                                <ShoppingCart size={16} />
                                                Reorder
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <>
                        <div className="card-header-plain">
                            <h3>Expiring Lenses</h3>
                            <span className="subtitle">Items near expiry (30 days) or expired</span>
                        </div>
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Expiry Date</th>
                                    <th>Qty</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expiringItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="font-medium">{item.name} <span className="text-muted text-xs block">{item.id}</span></td>
                                        <td>{item.expiry}</td>
                                        <td>{item.qty}</td>
                                        <td>
                                            <span className={`status-badge ${item.status === 'Expired' ? 'status-expired-red' : 'status-warning'}`}>
                                                {item.status === 'Expired' ? 'Expired' : 'Expiring Soon'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Alerts;

const styles = `
.alerts-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
}

.alerts-tabs {
    display: flex;
    gap: 16px;
    border-bottom: 2px solid var(--glass-border);
    padding-bottom: 2px;
}

.tab-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    margin-bottom: -4px; /* Align with border */
}

.tab-btn:hover {
    color: var(--text-main);
}

.tab-btn.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
}

.alerts-card {
    min-height: 400px;
    padding: 24px;
}

.card-header-plain {
    margin-bottom: 24px;
}

.card-header-plain h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.subtitle {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.text-danger {
    color: #ef4444;
}

.reorder-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--bg-main);
    border: 1px solid var(--primary);
    color: var(--primary);
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.85rem;
    transition: all 0.2s;
}

.reorder-btn:hover {
    background: var(--primary);
    color: white;
}

.status-expired-red {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
