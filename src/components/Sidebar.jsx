import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  List,
  Package,
  BarChart2,
  Bell,
  FileText,
  Users,
  History,
  Eye,
  ArrowRightLeft
} from 'lucide-react';
import '../index.css';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: List, label: 'Product', path: '/products' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: ArrowRightLeft, label: 'Stock Flow', path: '/stock-flow' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: BarChart2, label: 'Reports', path: '/reports' },
    { icon: Users, label: 'Accounts', path: '/accounts' },
    { icon: History, label: 'Activity Log', path: '/activity' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="logo-icon">
          <Eye size={28} color="#3b82f6" />
        </div>
        <span className="brand-name">OptoFive</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 'nav-item ' + (isActive ? 'active' : '')}
          >
            <item.icon className="nav-icon" size={24} />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

const styles = `
.sidebar {
  width: 250px;
  background-color: #1e293b;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  overflow-y: auto; /* Enable vertical scrolling */
}

/* Scrollbar styling for sidebar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}
.sidebar::-webkit-scrollbar-track {
  background: #0f172a;
}
.sidebar::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 3px;
}

.sidebar-brand {
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0; /* Prevent shrinking */
}

.logo-icon {
  margin-right: 12px;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.sidebar-nav {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  border-radius: 8px;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s ease;
  background: rgba(255,255,255,0.05); /* Slight bg */
  margin-bottom: 12px;
}

.nav-item:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.nav-item.active {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
}

.nav-icon {
  margin-bottom: 8px;
}

.nav-label {
  font-size: 0.85rem;
  font-weight: 500;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
