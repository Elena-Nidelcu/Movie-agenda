import { useState } from 'react'

export default function MovieForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!title || !year) return
    onAdd({ title, year, liked: false, watched: false })
    setTitle('')
    setYear('')
  }

  return (
    <form onSubmit={submit} className="flex gap-2 mb-6">
      <input className="border p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input className="border p-2" placeholder="Year" value={year} onChange={e => setYear(e.target.value)} />
      <button className="bg-blue-500 text-white px-4">Add</button>
    </form>
  )
}
