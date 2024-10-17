// src/components/ScheduleTask.jsx
import React, { useState } from 'react';
import PopupForm from './popupForm';
import './static/css/scheduleTask.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ScheduleTask() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      customerName: 'Customer A',
      group: 'Group 1',
      location: 'Location 1',
      scheduleDate: '2024-10-20',
      scheduleTime: '10:00',
      status: 'Scheduled',
    },
    {
      id: 2,
      customerName: 'Customer B',
      group: 'Group 2',
      location: 'Location 2',
      scheduleDate: '2024-10-21',
      scheduleTime: '12:00',
      status: 'Completed',
    },
  ]);
  const [editTask, setEditTask] = useState(null);

  const openPopup = (task = null) => {
    setEditTask(task);
    setPopupOpen(true);
  };
  const closePopup = () => setPopupOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the add/edit logic
    const formData = new FormData(event.target);
    const newTask = {
      id: editTask ? editTask.id : tasks.length + 1,
      customerName: formData.get('customerName'),
      group: formData.get('group'),
      location: formData.get('location'),
      scheduleDate: formData.get('scheduleDate'),
      scheduleTime: formData.get('scheduleTime'),
      status: formData.get('status'),
    };

    if (editTask) {
      // Edit existing task
      setTasks(tasks.map((task) => (task.id === editTask.id ? newTask : task)));
    } else {
      // Add new task
      setTasks([...tasks, newTask]);
    }
    closePopup();
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const formFields = {
    title: editTask ? 'Edit Task' : 'Add Task',
    fields: [
      { label: 'Customer Name', name: 'customerName', type: 'text', defaultValue: editTask?.customerName || '' },
      { label: 'Group', name: 'group', type: 'text', defaultValue: editTask?.group || '' },
      { label: 'Location', name: 'location', type: 'text', defaultValue: editTask?.location || '' },
      { label: 'Schedule Date', name: 'scheduleDate', type: 'date', defaultValue: editTask?.scheduleDate || '' },
      { label: 'Schedule Time', name: 'scheduleTime', type: 'time', defaultValue: editTask?.scheduleTime || '' },
      {
        label: 'Status',
        name: 'status',
        type: 'select',
        options: ['Scheduled', 'Not patched', 'Completed'],
        defaultValue: editTask?.status || 'Scheduled',
      },
    ],
  };

  return (
    <div className="schedule-task-content">
      <button className="add-task-btn" onClick={() => openPopup()}>
        Add Task
      </button>
      <table className="task-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Group</th>
            <th>Location</th>
            <th>Schedule Date</th>
            <th>Schedule Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.customerName}</td>
              <td>{task.group}</td>
              <td>{task.location}</td>
              <td>{task.scheduleDate}</td>
              <td>{task.scheduleTime}</td>
              <td>{task.status}</td>
              <td>
                <EditIcon
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => openPopup(task)}
                />
                <DeleteIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(task.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <PopupForm
        isOpen={isPopupOpen}
        onClose={closePopup}
        formFields={formFields}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ScheduleTask;
