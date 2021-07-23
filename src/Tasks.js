import React, {useState, useEffect} from 'react';
import AddTasks from './AddTasks';
import './App.css';

function Tasks({task}) {

  return (
    <div className="Tasks">
      {task.map(item => <div>
        {item}
      </div>)}
      {   
      }
    </div>
  );
}

export default Tasks;
