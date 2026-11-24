import { useState } from 'react'
import type { Todo } from './types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)

  const save = () => {
    if (draft.trim()) onEdit(todo.id, draft.trim())
    setEditing(false)
  }

  const cancel = () => {
    setDraft(todo.title)
    setEditing(false)
  }

  if (editing) {
    return (
      <li>
        <input
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={cancel}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
        />
      </li>
    )
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.done ? 'done' : ''}>{todo.title}</span>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Hapus</button>
    </li>
  )
}