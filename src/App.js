import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing the icons

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [servers, setServers] = useState([]);
  const [currentServer, setCurrentServer] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    hostName: '',
    operatingSystem: '',
    publicIP: '',
    privateIP: '',
    scheduledType: '',
    scheduledDate: '',
    scheduledTime: '',
    phase: '',
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClick = (section) => {
    setSelectedSection(section);
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleAddServerClick = () => {
    setCurrentServer(null);
    setFormData({
      customerName: '',
      hostName: '',
      operatingSystem: '',
      publicIP: '',
      privateIP: '',
      scheduledType: '',
      scheduledDate: '',
      scheduledTime: '',
      phase: '',
    });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentServer) {
      setServers(servers.map((server) =>
        server.id === currentServer.id ? { ...currentServer, ...formData } : server
      ));
    } else {
      setServers([
        ...servers,
        { id: Date.now(), ...formData },
      ]);
    }
    closePopup();
  };

  const handleEditClick = (server) => {
    setCurrentServer(server);
    setFormData(server);
    setIsPopupOpen(true);
  };

  const handleDeleteClick = (id) => {
    setServers(servers.filter((server) => server.id !== id));
  };

  return (
    <div className="App">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      <header className={`header ${isSidebarOpen ? 'shift' : ''}`}>
        <h1 className="header-title">Patch Management Tool</h1>
      </header>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <a href="#master" onClick={() => handleSidebarClick('master')}>Master</a>
        <a href="#schedule-task" onClick={() => handleSidebarClick('schedule-task')}>Schedule Task</a>
      </div>

      <div className={`content ${isSidebarOpen ? 'shift' : ''}`}>
        {selectedSection === '' && (
          <div>
            <h2>Welcome to the Patch Management Tool</h2>
            <p>This is the content area where your main functionalities will be displayed.</p>
            {/* <h3>Add Server</h3>
            <button className="add-server-button" onClick={handleAddServerClick}>Add Server</button> */}
          </div>
        )}

        {selectedSection === 'master' && (
          <div>
            <div className="master-header">
              <h3>Master - Add Server</h3>
              <button className="add-server-button" onClick={handleAddServerClick}>Add Server</button>
            </div>

            <table className="server-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Customer Name</th>
                  <th>Host Name</th>
                  <th>Operating System</th>
                  <th>Public IP Address</th>
                  <th>Private IP Address</th>
                  <th>Scheduled Type</th>
                  <th>Scheduled Date</th>
                  <th>Scheduled Time</th>
                  <th>Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {servers.map((server, index) => (
                  <tr key={server.id}>
                    <td>{index + 1}</td>
                    <td>{server.customerName}</td>
                    <td>{server.hostName}</td>
                    <td>{server.operatingSystem}</td>
                    <td>{server.publicIP}</td>
                    <td>{server.privateIP}</td>
                    <td>{server.scheduledType}</td>
                    <td>{server.scheduledDate}</td>
                    <td>{server.scheduledTime}</td>
                    <td>{server.phase}</td>
                    <td>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(server)} className="action-icon" />
                      <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(server.id)} className="action-icon delete-icon" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedSection === 'schedule-task' && (
          <div>
            <h3>Schedule Task Section</h3>
          </div>
        )}

        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>{currentServer ? 'Edit Server Form' : 'Add Server Form'}</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Customer Name:
                  <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} required />
                </label>
                <label>
                  Host Name:
                  <input type="text" name="hostName" value={formData.hostName} onChange={handleInputChange} required />
                </label>
                <label>
                  Operating System:
                  <input type="text" name="operatingSystem" value={formData.operatingSystem} onChange={handleInputChange} required />
                </label>
                <label>
                  Public IP Address:
                  <input type="text" name="publicIP" value={formData.publicIP} onChange={handleInputChange} required />
                </label>
                <label>
                  Private IP Address:
                  <input type="text" name="privateIP" value={formData.privateIP} onChange={handleInputChange} required />
                </label>
                <label>
                  Scheduled Type:
                  <input type="text" name="scheduledType" value={formData.scheduledType} onChange={handleInputChange} required />
                </label>
                <label>
                  Scheduled Date:
                  <input type="date" name="scheduledDate" value={formData.scheduledDate} onChange={handleInputChange} required />
                </label>
                <label>
                  Scheduled Time:
                  <input type="time" name="scheduledTime" value={formData.scheduledTime} onChange={handleInputChange} required />
                </label>
                <label>
                  Phase:
                  <input type="text" name="phase" value={formData.phase} onChange={handleInputChange} required />
                </label>
                <button type="submit" className="add-button">{currentServer ? 'Update' : 'Add'}</button>
                <button type="button" className="close-button" onClick={closePopup}>Close</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
