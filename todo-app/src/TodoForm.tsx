import { useState } from 'react'

interface Props {
  onAdd: (title: string) => void
}

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tugas baru"
      />
      <button>Tambah</button>
    </form>
  )
}