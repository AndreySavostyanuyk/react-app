import React, {useState, useEffect} from 'react';
import AddTasks from './AddTasks';
import './App.scss';
import axios from 'axios'

const App = () => {
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
