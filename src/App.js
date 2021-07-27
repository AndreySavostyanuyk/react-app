import React, {useState, useEffect} from 'react';
import AddTasks from './AddTasks';
import './App.css';
import axios from 'axios'
App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <AddTasks />
      </header>
    </div>
  );
}

export default App;
