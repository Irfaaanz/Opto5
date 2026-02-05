import React, { useState } from 'react';
import { ArrowRightLeft, CheckCircle, AlertCircle } from 'lucide-react';
import '../index.css';

const StockFlow = () => {
    const [formData, setFormData] = useState({
        productId: '',
        action: 'in', // 'in' or 'out'
        quantity: 1,
        reason: 'New Stock',
        notes: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock Product List
    const products = [
        { id: 'RB123', name: 'Ray-Ban RB5154 Black' },
        { id: 'AX002', name: 'AeroX (Rayban) Matte' },
        { id: 'AC001', name: 'Acuvue Oasys 1-Day' },
        { id: 'BF004', name: 'Biofinity Monthly' },
        { id: 'ZL005', name: 'Zeiss DuraVision Lens' }
    ];

    const reasons = {
        in: ['New Stock', 'Returned Item', 'Adjustment'],
        out: ['Sale', 'Damaged', 'Expired', 'Adjustment']
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleActionChange = (action) => {
        setFormData(prev => ({
            ...prev,
            action,
            reason: reasons[action][0] // Reset reason to first option of new action
        }));
    };

    const handleSubmit = () => {
        if (!formData.productId) {
            alert('Please select a product.');
            return;
        }
        if (formData.quantity <= 0) {
            alert('Quantity must be greater than 0.');
            return;
        }

        // Simulate API call / Update
        console.log('Transaction Submitted:', formData);

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            // Reset form optionally, or keep for rapid entry
            setFormData(prev => ({ ...prev, quantity: 1, notes: '' }));
        }, 3000);
    };

    return (
        <div className="stock-flow-container">
            <h1 className="page-title">Stock Flow</h1>

            <div className="stock-flow-card card">
                <div className="card-header">
                    <ArrowRightLeft size={24} className="text-primary" />
                    <h2>Record Transaction</h2>
                </div>

                <div className="form-grid-single">
                    {/* Product Selection */}
                    <div className="form-group">
                        <label>Product</label>
                        <select
                            name="productId"
                            value={formData.productId}
                            onChange={handleInputChange}
                            className="imput-lg"
                        >
                            <option value="">Select Product...</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>{p.id} - {p.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Action Toggle */}
                    <div className="form-group">
                        <label>Action</label>
                        <div className="action-toggle">
                            <button
                                className={`toggle-btn ${formData.action === 'in' ? 'active in' : ''}`}
                                onClick={() => handleActionChange('in')}
                            >
                                Stock In
                            </button>
                            <button
                                className={`toggle-btn ${formData.action === 'out' ? 'active out' : ''}`}
                                onClick={() => handleActionChange('out')}
                            >
                                Stock Out
                            </button>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Reason */}
                    <div className="form-group">
                        <label>Reason</label>
                        <select name="reason" value={formData.reason} onChange={handleInputChange}>
                            {reasons[formData.action].map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* Notes */}
                    <div className="form-group">
                        <label>Notes (Optional)</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Add reference number or details..."
                        />
                    </div>

                    {/* Submit */}
                    <button className="confirm-btn" onClick={handleSubmit}>
                        Confirm Transaction
                    </button>
                </div>
            </div>

            {/* Success Notification */}
            {showSuccess && (
                <div className="success-toast">
                    <CheckCircle size={20} />
                    <span>Inventory Updated Successfully!</span>
                </div>
            )}
        </div>
    );
};

export default StockFlow;

const styles = `
.stock-flow-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
}

.stock-flow-card {
    width: 100%;
    padding: 32px;
    background: var(--bg-card);
    border-radius: 20px;
    box-shadow: var(--shadow-md);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--glass-border);
}

.card-header h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-main);
}

.form-grid-single {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.action-toggle {
    display: flex;
    background: var(--bg-main);
    padding: 4px;
    border-radius: 12px;
    border: 1px solid var(--glass-border);
}

.toggle-btn {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    font-weight: 600;
    color: var(--text-muted);
    transition: all 0.2s;
}

.toggle-btn.active.in {
    background: #10b981;
    color: white;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.toggle-btn.active.out {
    background: #ef4444;
    color: white;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.confirm-btn {
    margin-top: 12px;
    padding: 16px;
    background: var(--primary);
    color: white;
    font-weight: 700;
    border-radius: 12px;
    font-size: 1.05rem;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    transition: transform 0.1s;
}

.confirm-btn:active {
    transform: scale(0.98);
}

.success-toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: var(--bg-card);
    color: #10b981;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: var(--shadow-premium);
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 600;
    animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid rgba(16, 185, 129, 0.2);
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.imput-lg {
    padding: 14px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
