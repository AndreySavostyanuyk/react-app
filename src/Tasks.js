import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Edit from './images/edit.svg';
import Clear from './images/clear.svg';
import Ok from './images/ok.svg';
import Delete from './images/delete.svg';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tasks = ({ tasks, testFunction, currentIndex, deleteTask, okTask, clearTask, editTask }) => {
  const classes = useStyles();
  const [changeInput, setChangeInput] = React.useState('');

  return (
    <List className={classes.root}>
      {tasks.map((value, index) => {
        const labelId = `checkbox-list-label-${value._id}`;
        return (
          <ListItem key={index} role={undefined} >
            <ListItemIcon>
              <Checkbox
                key={index}
                edge="start"
                checked={value.isCheck}
                onClick={(e) => testFunction(e.target.checked, value)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>

            {currentIndex === index ?
            <TextField label="Size" id="standard-size-small" defaultValue={value.text} size="small"  onChange={(e) => setChangeInput(e.target.value)} />
            : <ListItemText id={labelId} color='black' primary={value.text} />
            }
            {currentIndex === index ?
              <div> <img src={Ok} onClick={() => okTask(value, index, changeInput )} />
              <img src={Clear} onClick={() => clearTask()} /> </div>
              : <div><img src={Delete} onClick={() => deleteTask(index)} />
              <img src={Edit} onClick={() => editTask(value, index)} /></div>}
          </ListItem>
        );
      })}
    </List>
  );
}

export default Tasks;