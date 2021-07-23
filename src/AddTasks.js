import React, {useState, useEffect} from 'react';
import Tasks from './Tasks';
import './App.css';

function AddTasks() {

  const [task, setTask] = useState([]);

  

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      let updatedList = [...task, formData.get('task')]
      setTask(updatedList)   
     
  };
console.log('qw',task)
  
  return (
    <div>
      <form className="Add" onSubmit={handleSubmit}>
          <input type='text' id="task" name="task" />
          <button>Add</button>
      </form>
      <Tasks task={task}/>
    </div>
  );
}

export default AddTasks;
