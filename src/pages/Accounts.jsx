import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit,
    XCircle,
    Eye,
    X,
    Upload,
    CheckCircle,
    MoreHorizontal
} from 'lucide-react';
import '../index.css';

const Accounts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'asc'

    // Mock Data
    const [staffList, setStaffList] = useState([
        {
            id: 'STF001',
            firstName: 'Angela',
            lastName: 'Carter',
            username: 'Angela C.',
            email: 'any1994@gmail.com',
            phone: '1990 32 64 970',
            password: 'password123',
            role: 'Staff',
            status: 'Active',
            image: null
        },
        {
            id: 'STF002',
            firstName: 'Victor',
            lastName: 'James',
            username: 'Victor J.',
            email: 'vicky128@gmail.com',
            phone: '990 12 64 333',
            password: 'password123',
            role: 'Staff',
            status: 'Active',
            image: null
        },
        {
            id: 'STF003',
            firstName: 'Jhonathon',
            lastName: 'Ronan',
            username: 'Jhonathon R.',
            email: 'jhonathon12@gmail.com',
            phone: '990 32 64 235',
            password: 'password123',
            role: 'Admin',
            status: 'Inactive',
            image: null
        }
    ]);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        role: 'Staff',
        image: null
    });

    const openModal = (staff = null) => {
        setEditingStaff(staff);
        if (staff) {
            setFormData({ ...staff });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                phone: '',
                password: '',
                role: 'Staff',
                image: null
            });
        }
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!formData.firstName || !formData.email) {
            alert("Please fill in required fields");
            return;
        }

        if (editingStaff) {
            setStaffList(prev => prev.map(item => item.id === editingStaff.id ? { ...formData, id: item.id, status: item.status } : item));
        } else {
            const newStaff = {
                ...formData,
                id: `STF${Math.floor(Math.random() * 1000)}`,
                status: 'Active'
            };
            setStaffList(prev => [newStaff, ...prev]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this account?')) {
            setStaffList(prev => prev.filter(item => item.id !== id));
        }
    };

    // Filter & Search Logic
    const filteredList = staffList
        .filter(item =>
            item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.firstName.localeCompare(b.firstName);
            }
            // newest assumption: higher ID or just insertion order (mocking by index inverse not possible here easily without timestamp, so using ID)
            return b.id.localeCompare(a.id);
        });

    return (
        <div className="accounts-container">
            {/* Header Actions */}
            <div className="page-header-actions">
                <div className="left-controls">
                    <button
                        className={`filter-btn ${sortOrder === 'asc' ? 'active' : ''}`}
                        onClick={() => setSortOrder(prev => prev === 'asc' ? 'newest' : 'asc')}
                    >
                        <Filter size={18} />
                        <span>Filter: {sortOrder === 'asc' ? 'Name A-Z' : 'Newest'}</span>
                    </button>

                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search On This Table"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <button className="create-staff-btn" onClick={() => openModal()}>
                    <div className="btn-icon-circle">
                        <Plus size={20} />
                    </div>
                    <span>Create New Staff</span>
                </button>
            </div>

            {/* Staff Table */}
            <div className="card table-card">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((staff, index) => (
                            <tr key={index}>
                                <td className="font-medium text-main">{staff.firstName}</td>
                                <td>{staff.lastName}</td>
                                <td>{staff.username}</td>
                                <td className="text-muted">{staff.email}</td>
                                <td>{staff.phone}</td>
                                <td>•••••••</td>
                                <td>{staff.role}</td>
                                <td>
                                    <span className={`status-badge ${staff.status.toLowerCase()}`}>
                                        {staff.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-row">
                                        <button className="action-btn edit" onClick={() => openModal(staff)}>
                                            <Edit size={18} />
                                        </button>
                                        <button className="action-btn delete" onClick={() => handleDelete(staff.id)}>
                                            <XCircle size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content large-modal">
                        <div className="modal-header">
                            <h2>{editingStaff ? 'Edit User' : 'Create User'}</h2>
                            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter First Name" />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" />
                                </div>
                                <div className="form-group">
                                    <label>User Name</label>
                                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Enter User Name" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter Password" />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select name="role" value={formData.role} onChange={handleInputChange}>
                                        <option value="Staff">Staff</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>User Image</label>
                                    <div className="file-input-wrapper">
                                        <button className="choose-file-btn" onClick={() => document.getElementById('modal-file').click()}>
                                            Choose file
                                        </button>
                                        <span className="file-name">{formData.image ? 'Image Selected' : 'No file chosen'}</span>
                                        <input id="modal-file" type="file" hidden accept="image/*" onChange={handleImageChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-create" onClick={handleSubmit}>
                                {editingStaff ? 'Update User' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accounts;

const styles = `
.accounts-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.page-header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
}

.left-controls {
    display: flex;
    gap: 16px;
    align-items: center;
}

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
    height: 42px;
    width: 300px;
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
    box-shadow: none; /* Override default input shadow */
}

.create-staff-btn {
    background: var(--bg-card);
    padding: 8px 20px 8px 12px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: var(--shadow-sm);
    color: var(--text-main);
    font-weight: 700;
    font-size: 1.1rem;
    height: 60px;
}

.create-staff-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn-icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--text-main);
    border-radius: 50%;
    width: 32px;
    height: 32px;
}

.table-card {
    min-height: 600px;
    padding: 24px;
}

.status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.status-badge.active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
}

.status-badge.inactive {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

/* Large Modal Overrides */
.large-modal {
    width: 900px;
    max-width: 95vw;
}

.file-input-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 0;
}

.choose-file-btn {
    padding: 8px 16px;
    border: 1px solid var(--text-muted);
    background: transparent;
    border-radius: 4px;
    font-size: 0.9rem;
    color: var(--text-main);
    cursor: pointer;
}

.file-name {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.btn-create {
    width: 100%;
    padding: 14px;
    background: #10b981; /* Green color from design */
    color: white;
    font-weight: 600;
    border-radius: 8px;
    font-size: 1rem;
    transition: opacity 0.2s;
}

.btn-create:hover {
    opacity: 0.9;
}

/* Text Colors */
.text-main { color: var(--text-main); }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
