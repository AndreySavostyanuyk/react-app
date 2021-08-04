import React, { useEffect } from 'react';
import { Button,  FormControl, InputBase, NativeSelect, Select, MenuItem, InputLabel, makeStyles, withStyles } from '@material-ui/core';
import axios from 'axios'
import Tasks from './Tasks';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const AddTasks = () => {
  const classes = useStyles();
  const [textInput, setTextInput] = React.useState('');
  const [tasks, setTasks] = React.useState([])

  const handleChange = (event) => {
    setTextInput(event);
  };

  const addNewTask = () => {
    axios.post('http://localhost:8000/createTasks', {
      text: textInput,
      isCheck: false
    }).then(res => {
      setTextInput('');
      setTasks(res.data.data);
    })    
  };

  return (
    <div className="container">
      <div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Task</InputLabel>
          <InputBase
            className="item_CustomInput"
            value={textInput} 
            onChange={(e) => handleChange(e.target.value)} 
            id="demo-customized-textbox" 
          />
        </FormControl>
        <Button
          className='Button'
          onClick={() => addNewTask()}
          variant="outlined"
          color="primary">
          Add
        </Button>
      </div>
      <div className='tasks'>
        <Tasks
          setTasks={setTasks}
          tasks={tasks} 
        />
      </div>
    </div>
  );
}

export default AddTasks;