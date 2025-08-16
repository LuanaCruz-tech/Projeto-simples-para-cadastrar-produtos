import React, { useEffect, useState } from 'react'
import { listProducts, createProduct } from './api.js'

export default function App() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', price: '', category: '' })
  const [error, setError] = useState('')

  async function load() {
    try { setItems(await listProducts()) }
    catch (e) { setError(e.message) }
  }

  useEffect(() => { load() }, [])

  async function onSubmit(e) {
    e.preventDefault()
    try {
      await createProduct({ ...form, price: parseFloat(form.price) })
      setForm({ name: '', price: '', category: '' })
      load()
    } catch (e) { setError(e.message) }
  }

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Produtos</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input name="name" placeholder="Nome" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required/>
        <input name="price" placeholder="Preço" value={form.price} onChange={e => setForm({...form,price:e.target.value})} type="number" step="0.01" required/>
        <input name="category" placeholder="Categoria" value={form.category} onChange={e => setForm({...form,category:e.target.value})}/>
        <button type="submit">Adicionar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <table border="1" cellPadding="8" style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr><th>ID</th><th>Nome</th><th>Preço</th><th>Categoria</th></tr></thead>
        <tbody>
          {items.map(p=><tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.price}</td><td>{p.category}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
