// src/App.js
import React, { useState } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Master from './components/master';
import ScheduleTask from './components/scheduleTask';
import ViewTask from './components/viewTask';
import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'master':
        return <Master />;
      case 'scheduleTask':
        return <ScheduleTask />;
        case 'viewTask':
          return <ViewTask />;
      default:
        return <h3>Welcome to the Patch Management Tool</h3>;
    }
  };

  return (
    <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} />
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
