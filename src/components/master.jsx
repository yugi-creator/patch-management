// src/components/Master.jsx
import React, { useState } from 'react';
import PopupForm from './popupForm';
import './static/css/master.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Master() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null); // To track the row being edited
  const [tableData, setTableData] = useState([
    // Sample data for table
    {
      id: 1,
      customerName: 'Customer 1',
      hostName: 'Host 1',
      os: 'Windows',
      publicIp: '192.168.1.1',
      privateIp: '10.0.0.1',
      scheduledType: 'Type 1',
      scheduledDate: '2024-10-20',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      group: 'Group 1',
    },
    {
      id: 2,
      customerName: 'Customer 2',
      hostName: 'Host 2',
      os: 'Linux',
      publicIp: '192.168.1.2',
      privateIp: '10.0.0.2',
      scheduledType: 'Type 2',
      scheduledDate: '2024-10-21',
      startTime: '11:00 AM',
      endTime: '12:00 PM',
      group: 'Group 2',
    },
    // Add more rows as needed
  ]);

  const openPopup = (row) => {
    setEditingRow(row); // Set row to edit
    setPopupOpen(true);
  };

  const closePopup = () => {
    setEditingRow(null); // Clear editing state
    setPopupOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (either add new row or update existing)
    closePopup();
  };

  const handleDelete = (id) => {
    // Filter out the row with the matching id
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
  };

  const formFields = {
    title: editingRow ? 'Edit Server' : 'Add Server',
    fields: [
      { label: 'Customer Name', name: 'customerName', type: 'text' },
      { label: 'Host Name', name: 'hostName', type: 'text' },
      { label: 'Operating System', name: 'os', type: 'text' },
      { label: 'Public IP Address', name: 'publicIp', type: 'text' },
      { label: 'Private IP Address', name: 'privateIp', type: 'text' },
      { label: 'Scheduled Type', name: 'scheduledType', type: 'text' },
      { label: 'Scheduled Date', name: 'scheduledDate', type: 'date' },
      // Added separate fields for Start Time and End Time
      { label: 'Start Time', name: 'startTime', type: 'time' },
      { label: 'End Time', name: 'endTime', type: 'time' },
      { label: 'Group', name: 'group', type: 'text' },
    ],
    defaultValues: editingRow, // Pre-fill form with selected row data if editing
  };

  return (
    <div className="master-content">
      <button className="add-server-btn" onClick={() => openPopup(null)}>
        Add Server
      </button>

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
            <th>Start Time</th>
            <th>End Time</th>
            <th>Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.customerName}</td>
              <td>{row.hostName}</td>
              <td>{row.os}</td>
              <td>{row.publicIp}</td>
              <td>{row.privateIp}</td>
              <td>{row.scheduledType}</td>
              <td>{row.scheduledDate}</td>
              <td>{row.startTime}</td>
              <td>{row.endTime}</td>
              <td>{row.group}</td>
              <td>
                <IconButton onClick={() => openPopup(row)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Form */}
      <PopupForm
        isOpen={isPopupOpen}
        onClose={closePopup}
        formFields={formFields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Master;
