import React, { useEffect, useState } from 'react';
import { getTasks,getTaskNotes,addTaskNote,addTaskAttachment,getEmployees } from '../services/service';
import { getStatus } from '../utils/StatusMapper';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TaskAttachmentsModal from '../utils/TaskAttachmentsModal';
import TaskChangeStatus from '../utils/TaskChangeStatus';
import AddTaskModal from '../utils/AddTaskModal';
import { formatDate } from '../utils/DateUtils';
import { getEmployeeNameById } from '../utils/EmployeeUtils';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAttachmentListModal, setShowAttachmentListModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [file, setFile] = useState(null);



  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };
  const fetchEmployees = async ()=>{
    const response = await getEmployees();
    setEmployees(response.data);
  }
  const handleAddNotes = async (taskId) => {
    setSelectedTaskId(taskId);
    const response = await getTaskNotes(taskId);
    setNotes(response.data);
    setShowModal(true);
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSaveNote = async () => {
    await addTaskNote(selectedTaskId, newNote);
    const response = await getTaskNotes(selectedTaskId);
    setNotes(response.data);
    setNewNote('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNotes([]);
    setNewNote('');
  };
  const handleCloseModalAttachmentList = () => {
    setShowAttachmentListModal(false);
  };
  const handleCloseModalChangeStatus = () => {
    setShowChangeModal(false);
  };
  const handleCloseModalAddTask = () => {
    setShowAddModal(false);
  };


  const handleShowAttachmentList = (taskId) => {
    setSelectedTaskId(taskId);
    setShowAttachmentListModal(true);
  };

  const handleShowChangeStatus = (taskId) => {
    setSelectedTaskId(taskId);
    setShowChangeModal(true);
  };
  const handleShowAddTask = () => {
    setShowAddModal(true);
  };

  const handleAddAttachment = (taskId) => {
    setSelectedTaskId(taskId);
    setShowAttachmentModal(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSaveAttachment = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      
      await addTaskAttachment(selectedTaskId,formData);
      setFile(null);
    }
    setShowAttachmentModal(false);
  };

  const handleCloseAttachmentModal = () => {
    setShowAttachmentModal(false);
    setFile(null);
  };

  return (
    <>
    <div className="container">
    <h1>Task List</h1>
    <button className="btn btn-primary"onClick={() => handleShowAddTask()}>Add Task</button>

    <div className="container">
    <table className="table">
  <thead>
    <tr>
      <th scope="col">S.NO</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Assign To</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {tasks.map((task,index) => (
          <tr key={task.taskId}>
          <th scope="row" >{index + 1}</th>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{getEmployeeNameById(employees, task.assignedTo)}</td>
          <td>{formatDate(task.dueDate)}</td>
          <td>{getStatus(task.status)}</td>
          <td>
                <DropdownButton id="dropdown-basic-button" title={<BsThreeDotsVertical />}>
                  <Dropdown.Item onClick={() => handleAddNotes(task.taskId)}>Add Notes</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleAddAttachment(task.taskId)}>Add Attachment</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowAttachmentList(task.taskId)}>All Attachment</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowChangeStatus(task.taskId)}>Change Status</Dropdown.Item>
                </DropdownButton>
              </td>
        </tr>
        ))}


  </tbody>
</table>
<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Task Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {notes.map((note, index) => (
              <li key={index}>{note.note}</li>
            ))}
          </ul>
          <Form.Group controlId="formNewNote">
            <Form.Label>New Note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter note"
              value={newNote}
              onChange={handleNoteChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNote}>
            Save Note
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAttachmentModal} onHide={handleCloseAttachmentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Attachment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAttachmentModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAttachment}>
            Save Attachment
          </Button>
        </Modal.Footer>
      </Modal>
      <TaskAttachmentsModal taskId={selectedTaskId} show={showAttachmentListModal} onHide={handleCloseModalAttachmentList} />
      <TaskChangeStatus taskId={selectedTaskId} show={showChangeModal} onHide={handleCloseModalChangeStatus} fetchTasks={fetchTasks} />  
      <AddTaskModal show={showAddModal} onHide={handleCloseModalAddTask} fetchTasks={fetchTasks}/>

</div>
</div>
</>
  );
};

export default TaskList;
