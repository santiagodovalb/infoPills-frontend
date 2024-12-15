import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate('/');
    };

    return (
        <div className="layout">
            <div className="layout-banner" onClick={handleTitleClick}>
                PASTELAPP
            </div>
            <div className="layout-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
