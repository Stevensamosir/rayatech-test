import { useEffect, useState } from 'react'
import type { Todo } from './types'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

function loadTodos(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem('todos') ?? '[]')
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (title: string) =>
    setTodos([...todos, { id: crypto.randomUUID(), title, done: false }])

  const toggleTodo = (id: string) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const editTodo = (id: string, title: string) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, title } : t)))

  const deleteTodo = (id: string) => setTodos(todos.filter((t) => t.id !== id))

  return (
    <main>
      <h1>Todo</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
      {todos.length === 0 && <p>Belum ada tugas.</p>}
    </main>
  )
}