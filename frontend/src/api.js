const API_BASE = 'http://localhost:5000'

export async function listProducts() {
  const res = await fetch(`${API_BASE}/produto`)
  if (!res.ok) throw new Error('Falha ao carregar produtos')
  return res.json()
}

export async function createProduct(payload) {
  const res = await fetch(`${API_BASE}/produto`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Falha ao criar produto')
  }
  return res.json()
}
