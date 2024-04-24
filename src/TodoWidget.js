// TodoWidget.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const TodoWidget = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <div>
      <TextField
        label="Add todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        size="small"
      />
      <Button onClick={handleAddTodo} variant="contained" color="primary" style={{ marginLeft: 8 }}>
        Add
      </Button>
      <List dense>
        {todos.map((todo, index) => (
          <ListItem key={index}>
            <ListItemText primary={todo} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoWidget;
