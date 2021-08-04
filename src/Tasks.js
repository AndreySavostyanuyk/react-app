import React, { useEffect } from 'react';
import { 
  makeStyles,
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemSecondaryAction, 
  ListItemText, 
  Checkbox, 
  TextField } from '@material-ui/core';
import Edit from './images/edit.svg';
import Clear from './images/clear.svg';
import Ok from './images/ok.svg';
import Delete from './images/delete.svg';
import axios from 'axios';

const Tasks = ({ tasks, setTasks }) => {
  const [changeInput, setChangeInput] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState('');

  useEffect(() => {
    if (!tasks.length) {
      axios.get('http://localhost:8000/allTasks').then(res => {
        setTasks(res.data.data);
      })
    }
  }, [tasks]);

  const deleteTask = (index) => {
    axios.delete(`http://localhost:8000/deleteTasks?_id=${ tasks[index]._id }`).then(res => {
      setTasks(res.data.data);
    })
  };

  const editTask = (item, index) => {
    setChangeInput(item.text)
    setCurrentIndex(index);
  };
  
  const clearTask = () => {
    setCurrentIndex('');
  };

  const okTask = (item, index, changeInput) => {
    axios.patch('http://localhost:8000/editTasks', {
      _id: item._id,
      text: changeInput
    }).then(res => {
      setCurrentIndex('');
      setTasks(res.data.data);
    }).catch(err => console.log(err));
  };

  const editChecked = async(value) => {
    value.isCheck = !value.isCheck;

    axios.patch('http://localhost:8000/editTasks', {
      _id: value._id,
      isCheck: value.isCheck
    }).then(res => {
      setTasks(res.data.data);
    });
  };

  return (
    <List className='root'>
      {tasks.map((value, index) => {
        const labelId = `checkbox-list-label-${ value._id }`;
        return (
          <ListItem key={ index } role={ undefined } >
            <ListItemIcon>
              <Checkbox
                key={ index }
                checked={ value.isCheck }
                onClick={ () => editChecked(value) }
              />
            </ListItemIcon>

            {currentIndex === index ?
            <TextField
              className="item_input"
              label="Edit" 
              id="standard-size-small" 
              defaultValue={ value.text } 
              size="small"  
              onChange={(e) => setChangeInput(e.target.value)} 
            />
            : 
            <ListItemText 
              id={labelId} 
              color='black' 
              primary={value.text} 
            />
            }
            {currentIndex === index ?
              <div className="item_img"> 
                <img 
                  src={ Ok } 
                  onClick={ () => okTask(value, index, changeInput ) } 
                />
                <img 
                  src={ Clear } 
                  onClick={ () => clearTask() } 
                /> 
              </div>
              : 
              <div className="item_img">
                <img 
                  src={ Delete } 
                  onClick={ () => deleteTask(index) } 
                />
                <img src={ Edit } 
                  onClick={ () => editTask(value, index) } 
                />
              </div> 
              }
          </ListItem>
        );
      })}
    </List>
  );
}

export default Tasks;