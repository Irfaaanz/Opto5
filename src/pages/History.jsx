import React, { useState } from 'react';
import { History as HistoryIcon, Filter, Search, ChevronDown, Clock, User, FileText, Package } from 'lucide-react';
import '../index.css';

import Breadcrumb from '../components/Breadcrumb';

const History = () => {
    const [filterType, setFilterType] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data - Activity Log
    const activities = [
        { id: 1, date: '6 Feb, 10:35 AM', user: 'staff01', action: 'Stock out', product: 'Ray-Ban RB123 Black', qty: '2', note: 'Sale', type: 'Stock Out' },
        { id: 2, date: '6 Feb, 10:20 AM', user: 'admin', action: 'Product added', product: 'Vogue VG223', qty: '-', note: 'New collection', type: 'System' },
        { id: 3, date: '6 Feb, 09:55 AM', user: 'staff02', action: 'Stock in', product: 'SoftLens A', qty: '20', note: 'Restock from supplier', type: 'Stock In' },
        { id: 4, date: '5 Feb, 04:15 PM', user: 'admin', action: 'Account created', product: '-', qty: '-', note: 'Created staff03', type: 'System' },
        { id: 5, date: '5 Feb, 02:30 PM', user: 'admin', action: 'Product edited', product: 'Ray-Ban RB123 Black', qty: '-', note: 'Price adjustment', type: 'System' },
        { id: 6, date: '5 Feb, 11:00 AM', user: 'staff01', action: 'Stock out', product: 'Acuvue Oasys', qty: '1', note: 'Sale', type: 'Stock Out' },
        { id: 7, date: '4 Feb, 05:45 PM', user: 'staff02', action: 'Stock out', product: 'Hoya BlueControl', qty: '1', note: 'Damaged item return', type: 'Stock Out' },
        { id: 8, date: '4 Feb, 09:15 AM', user: 'admin', action: 'Stock in', product: 'Ray-Ban RB5154', qty: '10', note: 'New shipment', type: 'Stock In' },
    ];

    // Filter Logic
    const getFilteredActivities = () => {
        return activities.filter(item => {
            const matchesFilter = filterType === 'All' || item.type === filterType;
            const matchesSearch =
                item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.action.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    };

    const displayedActivities = getFilteredActivities();

    return (
        <div className="history-container">
            <Breadcrumb currentPage="Activity Log" />
            <div className="page-header">
                <div className="left-group">
                    <h1 className="page-title">Activity Log</h1>
                </div>

                <div className="right-group">
                    {/* Filter Dropdown (Simulated) */}
                    <div className="custom-select-wrapper">
                        <select
                            className="custom-select"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="All">All Actions</option>
                            <option value="Stock In">Stock In</option>
                            <option value="Stock Out">Stock Out</option>
                            <option value="System">System Changes</option>
                        </select>
                        <ChevronDown size={16} className="select-icon" />
                    </div>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search activity..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Activity Table */}
            <div className="card history-card">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Product / Target</th>
                            <th>Qty</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedActivities.map((item) => (
                            <tr key={item.id}>
                                <td className="text-muted font-mono">{item.date}</td>
                                <td>
                                    <div className="user-badge">
                                        <User size={14} />
                                        <span>{item.user}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`action-badge ${item.type.replace(/\s+/g, '-').toLowerCase()}`}>
                                        {item.action}
                                    </span>
                                </td>
                                <td className="font-medium">{item.product}</td>
                                <td className="font-bold">{item.qty}</td>
                                <td className="text-muted">{item.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;

const styles = `
.history-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

.history-card {
    min-height: 600px;
    background-color: var(--bg-card);
    border-radius: 20px;
    padding: 24px;
    box-shadow: var(--shadow-sm);
}

.user-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-main);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    width: fit-content;
    color: var(--text-main);
}

.action-badge {
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    display: inline-block;
}

.action-badge.stock-in {
    background: rgba(16, 185, 129, 0.15);
    color: #059669;
}

.action-badge.stock-out {
    background: rgba(239, 68, 68, 0.15);
    color: #dc2626;
}

.action-badge.system {
    background: rgba(59, 130, 246, 0.15);
    color: #2563eb;
}

.custom-select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.custom-select {
    appearance: none;
    background: var(--bg-card);
    border: 1px solid var(--glass-border);
    padding: 10px 36px 10px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    color: var(--text-main);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    outline: none;
}

.select-icon {
    position: absolute;
    right: 12px;
    color: var(--text-muted);
    pointer-events: none;
}

.font-mono {
    font-family: 'SF Mono', 'Roboto Mono', monospace;
    font-size: 0.85rem;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
