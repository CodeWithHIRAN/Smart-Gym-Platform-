import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '25px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    border: '1px solid rgba(255,255,255,0.3)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#222',
    fontSize: '2rem',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    gap: '12px',
    marginBottom: '25px',
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.3)',
    fontSize: '16px',
    background: 'rgba(255,255,255,0.2)',
    color: '#000',
    backdropFilter: 'blur(5px)',
    outline: 'none',
  },
  button: {
    padding: '12px 22px',
    backgroundColor: 'rgba(0,123,255,0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: 'rgba(0,123,255,1)',
    transform: 'translateY(-1px)',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  todoItem: {
    background: 'rgba(255, 255, 255, 0.25)',
    marginBottom: '12px',
    padding: '15px 22px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#222',
    fontWeight: '500',
    borderLeft: '5px solid #007bff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  todoItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  },
  todoText: {
    flex: 1,
    cursor: 'pointer',
  },
  completed: {
    textDecoration: 'line-through',
    color: '#555',
  },
  editInput: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.3)',
    background: 'rgba(255,255,255,0.2)',
    color: '#000',
    outline: 'none',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  actionButton: {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '18px',
    color: '#007bff',
    transition: 'color 0.2s',
  },
  actionButtonHover: {
    color: '#0056b3',
  },
};


export default function CustomTodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmed = newTodo.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditText('');
  };

  const saveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: trimmed } : todo
    ));
    cancelEditing();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Custom Todo List</h2>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          style={styles.input}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} style={styles.button}>Add</button>
      </div>

      <ul style={styles.list}>
        {todos.map(({ id, text, completed }) => (
          <li key={id} style={styles.todoItem}>
            {editId === id ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  style={styles.editInput}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEdit(id);
                    if (e.key === 'Escape') cancelEditing();
                  }}
                  autoFocus
                />
                <div style={styles.actions}>
                  <button onClick={() => saveEdit(id)} style={styles.actionButton} title="Save">💾</button>
                  <button onClick={cancelEditing} style={styles.actionButton} title="Cancel">❌</button>
                </div>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleComplete(id)}
                  style={{ 
                    ...styles.todoText, 
                    ...(completed ? styles.completed : {}) 
                  }}
                  title="Click to toggle complete"
                >
                  {text}
                </span>
                <div style={styles.actions}>
                  <button onClick={() => startEditing(id, text)} style={styles.actionButton} title="Edit">✏️</button>
                  <button onClick={() => deleteTodo(id)} style={styles.actionButton} title="Delete">🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
        {todos.length === 0 && <p>No todos yet. Add something above!</p>}
      </ul>
    </div>
  );
}
