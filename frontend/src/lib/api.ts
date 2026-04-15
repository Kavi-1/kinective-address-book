import type { Contact, ContactCreate, ContactUpdate } from "./types"

const API = import.meta.env.VITE_API_URL
const BASE = `${API}/api/v1/contacts`

async function handle(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export function listContacts(search?: string, skip = 0, limit = 5): Promise<Contact[]> {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) })
  if (search) params.set("search", search)
  return fetch(`${BASE}?${params}`).then(handle)
}

export function createContact(data: ContactCreate): Promise<Contact> {
  return fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handle)
}

export function updateContact(id: string, data: ContactUpdate): Promise<Contact> {
  return fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handle)
}

export function deleteContact(id: string): Promise<null> {
  return fetch(`${BASE}/${id}`, { method: "DELETE" }).then(handle)
}
