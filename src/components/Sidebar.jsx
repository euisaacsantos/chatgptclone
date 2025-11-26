import React from 'react';
import { FiPlus, FiMessageSquare, FiSettings, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';

const Sidebar = ({ isOpen, toggleSidebar, theme, toggleTheme }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <button className="new-chat-btn">
                    <FiPlus size={16} />
                    <span>New chat</span>
                </button>
            </div>

            <div className="sidebar-history">
                <div className="history-group">
                    <span className="history-label">Today</span>
                    <button className="history-item">
                        <FiMessageSquare size={16} />
                        <span className="text-truncate">React Component Help</span>
                    </button>
                    <button className="history-item">
                        <FiMessageSquare size={16} />
                        <span className="text-truncate">Explain Quantum Physics</span>
                    </button>
                </div>
                <div className="history-group">
                    <span className="history-label">Yesterday</span>
                    <button className="history-item">
                        <FiMessageSquare size={16} />
                        <span className="text-truncate">Recipe for Pasta</span>
                    </button>
                </div>
            </div>

            <div className="sidebar-footer">
                <button className="footer-item" onClick={toggleTheme}>
                    {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
                    <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                </button>
                <button className="footer-item">
                    <FiSettings size={16} />
                    <span>Settings</span>
                </button>
                <button className="footer-item">
                    <FiLogOut size={16} />
                    <span>Log out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
