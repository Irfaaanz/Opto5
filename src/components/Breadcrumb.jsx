import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ currentPage }) => {
    return (
        <div className="breadcrumb-nav">
            <Link to="/dashboard" className="breadcrumb-link text-muted">Dashboard</Link>
            <ChevronRight size={16} className="breadcrumb-separator text-muted" />
            <span className="breadcrumb-current text-primary font-medium">{currentPage}</span>

            <style>{`
                .breadcrumb-nav {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    margin-bottom: 8px;
                }
                .breadcrumb-link {
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .breadcrumb-link:hover {
                    color: var(--primary);
                }
                .text-primary { color: var(--primary); }
                .font-medium { font-weight: 500; }
            `}</style>
        </div>
    );
};

export default Breadcrumb;
