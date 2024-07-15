import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'; 

import { getTaskAttachments } from '../services/service';

export const TaskAttachmentsModal = ({ taskId, show, onHide }) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const data = await getTaskAttachments(taskId);
        console.log(data);
        setAttachments(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attachments:', error);
        // Handle error or show error message
      }
    };

    if (show) {
      fetchAttachments();
    }
  }, [taskId, show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Attachments for Task ID: {taskId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading attachments...</p>
        ) : attachments.length === 0 ? (
          <p>No attachments found.</p>
        ) : (
          <ul>
            {attachments.map((attachment) => (
              <li key={attachment.taskAttachmentId}>
                <a href={`${BASE_URL+attachment.filePath}`} target="_blank" rel="noopener noreferrer">
                  {attachment.fileName}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskAttachmentsModal;
