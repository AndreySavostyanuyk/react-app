import React, {useState, useEffect} from 'react';
import AddTasks from './AddTasks';
import './App.css';

const Task = ({ tasks }) => {
  return (
    <div className="Taskы">
      { tasks.map(item => 
      <div>
        { item }
      </div>) 
      }
    </div>
  );
}

export default Task;
