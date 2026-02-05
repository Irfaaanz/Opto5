import React, { useState } from 'react';
import {
  Plus,
  ChevronRight,
  Edit,
  XCircle,
  Play,
  X,
  Save,
  Search,
  Filter
} from 'lucide-react';
import '../index.css';

const Products = () => {
  const [activeTab, setActiveTab] = useState('spectacles'); // 'spectacles' or 'lenses'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'asc'

  // Dynamic Form State
  const [formData, setFormData] = useState({});

  // Mock Data State
  const [spectacles, setSpectacles] = useState([
    { id: 'SID001', brand: 'Ray-Ban RB5154', color: 'Black/Silver', size: 'M', type: 'Half-Rim', qty: 'Acetate' },
    { id: 'SID002', brand: 'AeroX (Rayban)', color: 'Black', size: 'M', type: 'Full-Rim', qty: 'Acetate' },
    { id: 'SID003', brand: 'ClassicPro (Oakley)', color: 'Brown', size: 'L', type: 'Half-Rim', qty: 'Metal' },
    { id: 'SID004', brand: 'UrbanLite (Gucci)', color: 'Gold', size: 'M', type: 'Full-Rim', qty: 'Metal' },
    { id: 'SID005', brand: 'SportMax (Prada)', color: 'Blue', size: 'S', type: 'Full-Rim', qty: 'TR90' },
  ]);

  const [lenses, setLenses] = useState([
    { id: 'CID001', brand: 'Acuvue', power: '-1.00', category: 'Daily', bc: '8.5', dia: '14.2', expiry: '2027-03-15' },
    { id: 'CID002', brand: 'Acuvue', power: '-2.00', category: 'Daily', bc: '8.5', dia: '14.2', expiry: '2027-06-20' },
    { id: 'CID003', brand: 'Acuvue', power: '-3.00', category: 'Monthly', bc: '8.4', dia: '14.0', expiry: '2027-01-10' },
    { id: 'CID004', brand: 'Acuvue', power: '-4.00', category: 'Monthly', bc: '8.4', dia: '14.0', expiry: '2027-11-05' },
  ]);

  const handleToggle = () => {
    setActiveTab(prev => prev === 'spectacles' ? 'lenses' : 'spectacles');
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      if (activeTab === 'spectacles') {
        setSpectacles(prev => prev.filter(item => item.id !== id));
      } else {
        setLenses(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const openModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({ ...product });
    } else {
      // Initial empty state based on tab
      if (activeTab === 'spectacles') {
        setFormData({
          id: '', brand: '', color: '', size: '', type: '', qty: ''
        });
      } else {
        setFormData({
          id: '', brand: '', power: '', category: '', bc: '', dia: '', expiry: ''
        });
      }
    }
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Simple Validation
    if (!formData.id || !formData.brand) {
      alert("Please fill in required fields (ID, Brand)");
      return;
    }

    if (activeTab === 'spectacles') {
      if (editingProduct) {
        setSpectacles(prev => prev.map(item => item.id === editingProduct.id ? formData : item));
      } else {
        setSpectacles(prev => [...prev, formData]);
      }
    } else {
      if (editingProduct) {
        setLenses(prev => prev.map(item => item.id === editingProduct.id ? formData : item));
      } else {
        setLenses(prev => [...prev, formData]);
      }
    }
    setIsModalOpen(false);
  };

  // Filter Logic
  const getFilteredData = (data) => {
    return data
      .filter(item =>
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.brand.localeCompare(b.brand);
        }
        return b.id.localeCompare(a.id); // 'newest' proxy via ID
      });
  };

  const displayedData = activeTab === 'spectacles'
    ? getFilteredData(spectacles)
    : getFilteredData(lenses);

  return (
    <div className="product-page-container">
      {/* Header Actions */}
      <div className="page-header">
        <div className="left-group">
          {/* Toggle Button / Switcher */}
          <div
            className="view-toggle-btn"
            onClick={handleToggle}
            role="button"
            tabIndex={0}
          >
            <div className="toggle-icon-wrap">
              <Play size={16} fill="black" style={{ transform: 'rotate(0deg)' }} />
            </div>
            <span className="toggle-label">
              {activeTab === 'spectacles' ? 'Spectacles' : 'Lenses'}
            </span>
          </div>
        </div>

        <div className="right-group">
          {/* Filter Button */}
          <button
            className={`filter-btn ${sortOrder === 'asc' ? 'active' : ''}`}
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'newest' : 'asc')}
          >
            <Filter size={18} />
            <span>Filter: {sortOrder === 'asc' ? 'Brand A-Z' : 'Newest'}</span>
          </button>

          {/* Search Bar */}
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Create Product Button */}
          <button className="create-product-btn" onClick={() => openModal()}>
            <div className="create-icon-wrap">
              <Plus size={20} />
            </div>
            <span>Create Product</span>
          </button>
        </div>
      </div>

      {/* Product Table Card */}
      <div className="card product-card">
        <table className="custom-table product-table">
          <thead>
            {activeTab === 'spectacles' ? (
              <tr>
                <th>Product ID</th>
                <th>Brand & Model</th>
                <th>Color</th>
                <th>Size (mm)</th>
                <th>Frame Type</th>
                <th>Material</th>
                <th>Action</th>
              </tr>
            ) : (
              <tr>
                <th>Product ID</th>
                <th>Brand</th>
                <th>Power</th>
                <th>Category</th>
                <th>Base Curve</th>
                <th>Diameter</th>
                <th>Expired Date</th>
                <th>Action</th>
              </tr>
            )}
          </thead>
          <tbody>
            {activeTab === 'spectacles' ? (
              displayedData.map((item, index) => (
                <tr key={index}>
                  <td className="text-muted">{item.id}</td>
                  <td className="font-medium">{item.brand}</td>
                  <td>{item.color}</td>
                  <td>{item.size}</td>
                  <td>{item.type}</td>
                  <td>{item.qty}</td>
                  <td>
                    <div className="action-row">
                      <button className="action-btn edit" onClick={() => openModal(item)}>
                        <Edit size={18} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(item.id)}>
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              displayedData.map((item, index) => (
                <tr key={index}>
                  <td className="text-muted">{item.id}</td>
                  <td className="font-medium">{item.brand}</td>
                  <td>{item.power}</td>
                  <td>{item.category}</td>
                  <td>{item.bc}</td>
                  <td>{item.dia}</td>
                  <td>{item.expiry}</td>
                  <td>
                    <div className="action-row">
                      <button className="action-btn edit" onClick={() => openModal(item)}>
                        <Edit size={18} />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(item.id)}>
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Create Product'}</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                {activeTab === 'spectacles' ? (
                  <>
                    <div className="form-group">
                      <label>Product ID</label>
                      <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="SID..." />
                    </div>
                    <div className="form-group">
                      <label>Brand & Model</label>
                      <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Ray-Ban..." />
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <input type="text" name="color" value={formData.color} onChange={handleInputChange} placeholder="Black/Gold" />
                    </div>
                    <div className="form-group">
                      <label>Size (mm)</label>
                      <input type="text" name="size" value={formData.size} onChange={handleInputChange} placeholder="M / 52-18" />
                    </div>
                    <div className="form-group">
                      <label>Frame Type</label>
                      <select name="type" value={formData.type} onChange={handleInputChange}>
                        <option value="">Select Type</option>
                        <option value="Full-Rim">Full-Rim</option>
                        <option value="Half-Rim">Half-Rim</option>
                        <option value="Rimless">Rimless</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Material</label>
                      <input type="text" name="qty" value={formData.qty} onChange={handleInputChange} placeholder="Acetate/Metal" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Product ID</label>
                      <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="CID..." />
                    </div>
                    <div className="form-group">
                      <label>Brand</label>
                      <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} placeholder="Acuvue..." />
                    </div>
                    <div className="form-group">
                      <label>Power</label>
                      <input type="text" name="power" value={formData.power} onChange={handleInputChange} placeholder="-1.00" />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select name="category" value={formData.category} onChange={handleInputChange}>
                        <option value="">Select Category</option>
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Bi-Weekly">Bi-Weekly</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Base Curve (BC)</label>
                      <input type="text" name="bc" value={formData.bc} onChange={handleInputChange} placeholder="8.5" />
                    </div>
                    <div className="form-group">
                      <label>Diameter (DIA)</label>
                      <input type="text" name="dia" value={formData.dia} onChange={handleInputChange} placeholder="14.2" />
                    </div>
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="date" name="expiry" value={formData.expiry} onChange={handleInputChange} />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-submit" onClick={handleSave}>
                <Save size={18} />
                {editingProduct ? 'Update Product' : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

const styles = `
.product-page-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.right-group {
    display: flex;
    align-items: center;
    gap: 12px;
}

.view-toggle-btn {
  background: var(--bg-card);
  padding: 12px 24px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  min-width: 200px;
}

.view-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.toggle-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-main);
}

.create-product-btn {
  background: var(--bg-card);
  padding: 12px 24px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-sm);
  color: var(--text-main);
  font-weight: 700;
  font-size: 1rem;
}

.create-product-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.create-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--text-main);
  border-radius: 50%;
  padding: 2px;
}

/* Filter & Search Styles */
.filter-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: var(--bg-card);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--secondary);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
}

.filter-btn.active {
    background: rgba(59, 130, 246, 0.1);
    border-color: var(--secondary);
}

.search-bar {
    display: flex;
    align-items: center;
    background: var(--bg-card);
    padding: 0 16px;
    border-radius: 8px;
    height: 48px; /* Match button height roughly */
    width: 220px;
    box-shadow: var(--shadow-sm);
}

.search-icon {
    color: var(--text-muted);
}

.search-bar input {
    border: none;
    background: transparent;
    padding: 8px 12px;
    font-size: 0.9rem;
    outline: none;
    width: 100%;
    color: var(--text-main);
    box-shadow: none;
}

.product-card {
  min-height: 600px;
  background-color: var(--bg-card);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.product-table th {
  padding: 24px;
  font-size: 0.95rem;
  color: var(--table-header-color);
}

.product-table td {
  padding: 20px 24px;
  vertical-align: middle;
  color: var(--table-text-color);
}

.font-medium {
  font-weight: 600;
  color: var(--text-main);
}

.action-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  background: transparent;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.action-btn.view { color: #10b981; }
.action-btn.edit { color: #3b82f6; }
.action-btn.delete { color: #ef4444; }

.action-btn:hover {
  background: rgba(0,0,0,0.05);
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease-out;
}

.modal-content {
    background: var(--bg-card);
    width: 800px;
    max-width: 90vw;
    border-radius: 20px;
    box-shadow: var(--shadow-premium);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
    padding: 24px;
    border-bottom: 1px solid var(--glass-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
}

.modal-close-btn {
    background: transparent;
    color: var(--text-muted);
    padding: 8px;
    border-radius: 50%;
}
.modal-close-btn:hover {
    background: rgba(0,0,0,0.05);
    color: var(--danger);
}

.modal-body {
    padding: 32px;
    background: var(--bg-main); /* Slight contrast */
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-main);
}

.form-group input, .form-group select {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: var(--bg-card);
    color: var(--text-main);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s;
}

.form-group input:focus, .form-group select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
}

.modal-footer {
    padding: 24px;
    background: var(--bg-card);
    border-top: 1px solid var(--glass-border);
    display: flex;
    justify-content: flex-end;
    gap: 16px;
}

.btn-cancel {
    padding: 12px 24px;
    border-radius: 12px;
    background: transparent;
    color: var(--text-muted);
    font-weight: 600;
    border: 1px solid var(--glass-border);
}
.btn-cancel:hover {
    background: var(--bg-main);
    color: var(--text-main);
}

.btn-submit {
    padding: 12px 24px;
    border-radius: 12px;
    background: var(--primary);
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
}
.btn-submit:hover {
    transform: translateY(-1px);
    opacity: 0.9;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
