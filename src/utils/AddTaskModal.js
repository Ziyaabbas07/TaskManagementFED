import React, { useState,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { getEmployees,addTask } from '../services/service';


const AddTaskModal = ({  show, onHide , fetchTasks}) => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        fetchEmployees();
      }, []);
    const fetchEmployees = async () => {
        const response = await getEmployees();
        setEmployees(response.data);
      };
    const [taskData, setTaskData] = useState({
        taskId: 0,
        title: '',
        description: '',
        assignedTo: 0,
        dueDate:''
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTask(taskData);
        fetchTasks();
        onHide();
      };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-sm-12">
                <label>Title</label>
                <input className="form-control" type="text" name='title' value={taskData.title} onChange={handleChange} placeholder="Enter"/>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <label>Description</label>
                <input className="form-control" type="text" value={taskData.description} onChange={handleChange} name="description" placeholder="Enter"/>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <label>Assign To</label>
                <select className="form-control" name='assignedTo' value={taskData.assignedTo} onChange={handleChange}>
                    <option value={0} disabled>select</option>
                    {employees && employees.map((employee,index)=>(
                        <option key={index} value={employee.userId}>{employee.firstName + ' ' + employee.lastName}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12">
                <label>Due Date</label>
                <input className="form-control" type="date" value={taskData.dueDate} onChange={handleChange} name="dueDate" placeholder="Enter"/>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary mt-3 me-2">Save</button>
                <button type="button" onClick={onHide} className="btn btn-danger mt-3">Exit</button>
            </div>
        </div>
        
    </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
