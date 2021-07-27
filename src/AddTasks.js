import React, { useState, useEffect } from 'react';
import Delete from './images/delete.svg';
import Edit from './images/edit.svg';
import Clear from './images/clear.svg';
import Ok from './images/ok.svg';
import './App.css';
import axios from 'axios'

function AddTasks() {
  const [tasks, setTasks] = useState([])
  const [textInput, setTextInput] = useState('');
  const [changeInput, setChangeInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    })
  });
  
  const addNewTask = () => {
    axios.post('http://localhost:8000/createTasks', {
      text: textInput,
      isCheck: false
    }).then(res => {
      setTextInput('');
      setTasks(res.data.data);
    })
  };

  const deleteTask = (index) => {
    axios.delete(`http://localhost:8000/deleteTasks?_id=${tasks[index]._id}`).then(res => {
      setTasks(res.data.data);
    })
  };

  const editTask = (item, index) => {
    setCurrentIndex(index);
  };

  const clearTask = () => {
    setCurrentIndex('');
  };

  const okTask = (item, index) => {
    setCurrentIndex('');
    axios.patch('http://localhost:8000/editTasks', {
      _id: item._id,
      text: changeInput
    }).then(res => {
      setTasks(res.data.data);
    })
  };

  return (
    <div>
      <form className="Add" >
        <input type='text' id="task" name="task" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
        <button onClick={() => addNewTask()}>Add</button>
      </form>
      <div className="Tasks">
      {
        tasks.map((item, index) => 
          <div className="item" key={`task-${index}`}>
            <input type='checkbox' isCheck={item.isCheck} />
            {currentIndex === index ? 
            <input defaultValue={ item.text } 
            key={ `text-${index}` } 
            onChange={(e) => setChangeInput(e.target.value)} /> 
            : <span key={ `text-${ index }` }>{ item.text }</span>}
            {currentIndex === index  ? 
            <div> <img src={ Ok } onClick={() => okTask(item, index)}/> 
            <img src={ Clear } onClick={() => clearTask()}/> </div> 
            : <div><img src={ Delete } onClick={() => deleteTask(index)}/> 
            <img src={ Edit } onClick={() => editTask(item, index)}/></div>}
          </div>
      )}
      </div>
    </div>
  );
}

export default AddTasks;
