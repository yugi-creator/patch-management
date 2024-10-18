// src/components/Sidebar.jsx
import React from 'react';
import './assests/css/sidebar.css';

function Sidebar({ setActivePage, isSidebarOpen }) {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
      <ul>
        <li onClick={() => setActivePage('home')}>Home</li>
        <li onClick={() => setActivePage('master')}>Master</li>
        <li onClick={() => setActivePage('scheduleTask')}>Schedule Task</li>
        <li onClick={() => setActivePage('viewTask')}>View Task</li>
      </ul>
      </div>
    </div>
  );
}

export default Sidebar;
