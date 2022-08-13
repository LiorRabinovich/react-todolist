import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './app.css'

function App() {
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState(() => {
    const todoListLS = window.localStorage.getItem('todoList');
    return todoListLS ? JSON.parse(todoListLS) : [];
  })

  useEffect(() => {
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  function handleInputChange(e) {
    setInput(e.target.value)
  }

  function addTodo(e) {
    e.preventDefault();
    if (!input) {
      alert('Please enter text');
      return;
    }
    setTodoList([...todoList, { id: uuidv4(), title: input, checked: false }])
    setInput('')
  }

  function deleteItem(id) {
    const newTodoList = todoList.filter((item) => {
      return item.id !== id;
    });
    setTodoList(newTodoList);
  }

  function checkedItem(id) {
    const newTodoList = todoList.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setTodoList(newTodoList);
  }

  return (
    <div className="todolist">
      <form onSubmit={addTodo}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">ADD</button>
      </form>

      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            <input type="checkbox" id={item.id} checked={item.checked} onChange={() => checkedItem(item.id)} />
            <label htmlFor={item.id}>{item.title}</label>
            <button onClick={() => deleteItem(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
