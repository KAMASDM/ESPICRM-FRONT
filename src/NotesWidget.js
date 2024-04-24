import React, { useState } from 'react';
import { TextField, Button, Paper, IconButton, Typography, Checkbox, Grid, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const NotesWidget = () => {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleSaveNote = () => {
    if (noteText.trim()) {
      const dateTime = new Date().toISOString();
      if (editIndex >= 0) {
        const updatedNotes = notes.map((item, index) => {
          if (index === editIndex) {
            return { ...item, text: noteText, dateTime };
          }
          return item;
        });
        setNotes(updatedNotes);
        setEditIndex(-1);
      } else {
        setNotes([...notes, { id: Date.now(), text: noteText, dateTime, todos: [], followUpDate: '' }]);
      }
      setNoteText('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (index) => {
    setEditIndex(index);
    setNoteText(notes[index].text);
  };

  const handleAddTodo = (noteId, todoText) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        const newTodo = { id: Date.now(), text: todoText, done: false };
        return { ...note, todos: [...note.todos, newTodo] };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const toggleTodo = (noteId, todoId) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        const updatedTodos = note.todos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
        return { ...note, todos: updatedTodos };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const setFollowUpDate = (noteId, date) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return { ...note, followUpDate: date };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <div>
      <TextField
        label="New Note"
        multiline
        rows={4}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button onClick={handleSaveNote} variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
        {editIndex === -1 ? 'Add Note' : 'Update Note'}
      </Button>
      <Box sx={{ maxHeight: 400, overflowY: 'auto', width: '100%' }}>
        {notes.map((note, index) => (
          <Box sx={{ position: 'relative', marginBottom: 2, marginTop: 10 }}>
            <Box sx={{
              position: 'absolute',
              top: -30,
              left: 16,
              padding: '10px 8px',
              backgroundColor: '#ffffff', // Adjust this as necessary
              color: 'text.secondary',
              fontWeight: 'bold'
            }}>
              {new Date(note.dateTime).toLocaleString()}
            </Box>
            <Paper elevation={3} sx={{ padding: 2, paddingTop: 3, minHeight: 100, position: 'relative' }}>
              <Typography variant="body1">{note.text}</Typography>
              {note.todos.map(todo => (
                <Grid container spacing={1} alignItems="center" key={todo.id}>
                  <Grid item>
                    <Checkbox checked={todo.done} onChange={() => toggleTodo(note.id, todo.id)} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="body2" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                      {todo.text}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm>
                  <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    placeholder="Add todo"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleAddTodo(note.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm>
                  <TextField
                    size="small"
                    type="date"
                    fullWidth
                    label="Follow-up Date"
                    value={note.followUpDate || ''}
                    onChange={(e) => setFollowUpDate(note.id, e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item>
                  <IconButton onClick={() => handleEditNote(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleDeleteNote(note.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default NotesWidget;
