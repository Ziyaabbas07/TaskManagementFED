import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { changeTaskStatus } from '../services/service';
const TaskStatus = {
    Open: 'Open',
    InProgress: 'In Progress',
    Completed: 'Completed',
  };
const TaskChangeStatus = ({ taskId, show, onHide ,fetchTasks}) => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeStatus = async () => {
    try {
      setLoading(true);
      await changeTaskStatus(taskId, status);

      setLoading(false);
      fetchTasks();
      onHide();

    } catch (error) {
      alert('Error changing task status. Please try again.');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Attachments for Task ID: {taskId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label htmlFor="status">Change Status:</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value={0}>{TaskStatus.Open}</option>
            <option value={1}>{TaskStatus.InProgress}</option>
            <option value={2}>{TaskStatus.Completed}</option>
          </select>
          <Button variant="primary" onClick={handleChangeStatus} disabled={loading}>
            {loading ? 'Changing Status...' : 'Change Status'}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskChangeStatus;
