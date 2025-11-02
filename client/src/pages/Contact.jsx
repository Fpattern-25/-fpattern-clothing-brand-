import { useState } from 'react'
import { api } from '../api/client.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [msg, setMsg] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/contact', form)
      setMsg('Message sent! We will get back soon.')
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      setMsg('Failed to send message.')
    }
  }
  return (
    <div className="container-px mx-auto py-8 max-w-xl">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <form onSubmit={submit} className="card p-6 space-y-3 mt-4">
        <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} required />
        <input className="border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} required />
        <textarea className="border rounded px-3 py-2" rows="4" placeholder="Message" value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} required />
        <button className="btn" type="submit">Send</button>
        {msg && <div className="text-sm text-gray-600">{msg}</div>}
      </form>
    </div>
  )
}
