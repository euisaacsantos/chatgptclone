import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import ModelSelector from './components/ModelSelector';
import { FiMenu } from 'react-icons/fi';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark'); // Default to dark mode as requested
  const [currentModel, setCurrentModel] = useState('gemini-1.5-flash');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <div className="main-content">
        <div className="top-bar">
          <div className="mobile-menu-btn">
            <button onClick={toggleSidebar} className="menu-btn">
              <FiMenu size={24} />
            </button>
          </div>
          <ModelSelector currentModel={currentModel} onSelectModel={setCurrentModel} />
        </div>

        <ChatArea currentModel={currentModel} />
      </div>
    </div>
  );
}

export default App;
