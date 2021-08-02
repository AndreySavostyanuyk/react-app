import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';
import axios from 'axios'
import Tasks from './Tasks';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const Input = () => {
  const classes = useStyles();
  const [textInput, setTextInput] = React.useState('');
  const [tasks, setTasks] = React.useState([])
  const [checked, setChecked] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    })
  });

  const handleChange = (event) => {
    setTextInput(event);
  };

  const addNewTask = () => {
    axios.post('http://localhost:8000/createTasks', {
      text: textInput,
      isCheck: 0
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
  
  const okTask = (item, index, changeInput) => {
    setCurrentIndex('');
    axios.patch('http://localhost:8000/editTasks', {
      _id: item._id,
      text: changeInput
    }).then(res => {
      setTasks(res.data.data);
    });
  };

  const testFunction = (value, event) => {
    setChecked(event.isCheck)

    if (checked === false) {
      setChecked(true)
    } else {
      setChecked(false)
    };
 
    axios.patch('http://localhost:8000/editTasks', {
      _id: event._id,
      isCheck: checked
    }).then(res => {
      setTasks(res.data.data);
    });
  };

  return (
    <div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Task</InputLabel>
          <BootstrapInput value={textInput} onChange={(e) => handleChange(e.target.value)} id="demo-customized-textbox" />
        </FormControl>
        <Button
        className='Button'
        onClick={() => addNewTask()}
        variant="outlined"
        color="primary">
        Add
        </Button>
      </div>
      <div>
        <Tasks
        currentIndex={currentIndex}
        testFunction={testFunction}
        deleteTask={deleteTask}
        okTask={okTask}
        clearTask={clearTask}
        editTask={editTask}
        tasks={tasks} 
        />
      </div>
    </div>
  );
}

export default Input;