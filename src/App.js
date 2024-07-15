import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/tasks" element={<TaskList/>} />
          <Route path="/" exact element={<TaskList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
