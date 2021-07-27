import React, {useState, useEffect} from 'react';
import Delete from './images/delete.svg';
import Edit from './images/edit.svg';
import Clear from './images/clear.svg';
import Ok from './images/ok.svg';
import './App.css';
import axios from 'axios'

function AddTasks() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [flag, setFlag] = useState('');

  useEffect(async() => {
    await axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    })
  });
  
  const addNewTask = async() => {
    await axios.post('http://localhost:8000/createTasks', {
      text,
      isCheck: false
    }).then(res => {
      setText('');
      setTasks(res.data.data);
    })
  };

  const deleteTask = async(index) => {
    await axios.delete(`http://localhost:8000/deleteTasks?_id=${tasks[index]._id}`).then(res => {
      setTasks(res.data.data);
    })
  };

  const editTask = async(item, index) => {
    setFlag(index);
  };

  const clearTask = () => {
    setFlag('');
  };

  const okTask = async(item, index) => {
    setFlag('');
    await axios.patch('http://localhost:8000/editTasks', {
      _id: item._id,
      text: text2
    }).then(res => {
      setTasks(res.data.data);
    })
  };

  return (
    <div>
      <form className="Add" >
        <input type='text' id="task" name="task" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={() => addNewTask()}>Add</button>
      </form>
      <div className="Tasks">
        {
        tasks.map((item, index) => 
        <div className="item" key={`task-${index}`}>
          <input type='checkbox' isCheck={item.isCheck} />
          {flag === index ? <input defaultValue={ item.text } key={ `text-${index}` } onChange={(e) => setText2(e.target.value)} /> : <span key={ `text-${ index }` }>{ item.text }</span>}
          {flag === index  ? <div> <img src={ Ok } onClick={() => okTask(item, index)}/> <img src={ Clear } onClick={() => clearTask()}/> </div> : <div><img src={ Delete } onClick={() => deleteTask(index)}/> <img src={ Edit } onClick={() => editTask(item, index)}/></div>}
        </div>
        )}
      </div>
    </div>
  );
}

export default AddTasks;
