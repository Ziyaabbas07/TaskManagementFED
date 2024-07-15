import axios from 'axios';

const API_URL = 'https://localhost:7130/api/';
//tasks APIs

export const addTask = async (obj) => {
  return await axios.post(`${API_URL}Tasks/AddTask`, {
    title:obj.title,
    description: obj.description,
    assignedTo : obj.assignedTo,
    dueDate : obj.dueDate
  });
};

export const getTasks = async () => {
  return await axios.get(`${API_URL}Tasks/GetTasks`);
};

export const changeTaskStatus = async (taskId, status) => {
  const response = await axios.post(`${API_URL}Tasks/ChangeTaskStatus?id=${taskId}&status=${status}`);
  console.log(response);
  return response.data; 
};

//get employees API

export const getEmployees = async () => {
  return await axios.get(API_URL + 'Users/GetAllEmployees');
};

// Notes and Attachment APIs

export const getTaskNotes = async (id) => {
  return await axios.get(`${API_URL}TasksNote/GetTasksNoteByTaskId/${id}`);
};

export const getTaskAttachments = async (id) => {
  return await axios.get(`${API_URL}TaskAttachments/GetTaskAttachmentsByTaskId/${id}`);
};

export const addTaskNote = async (taskId, noteContent) => {
  return await axios.post(`${API_URL}TasksNote/AddTaskNote`, {
    taskNoteId: 0,
    note: noteContent,
    taskId: taskId
  });
};

export const addTaskAttachment = async (taskId, formData) => {
  return await axios.post(`${API_URL}TaskAttachments/AddTaskAttachment?taskId=${taskId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

