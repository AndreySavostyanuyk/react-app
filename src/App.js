import React, {useState, useEffect} from 'react';
import Input from './Input';
import './App.css';
import axios from 'axios'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <Input />
      </header>
    </div>
  );
}

export default App;
