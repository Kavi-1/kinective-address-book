import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/Header"
import { SearchBar } from "@/components/SearchBar"
import { ContactList } from "@/components/ContactList"
import { ContactForm } from "@/components/ContactForm"
import {
  createContact,
  deleteContact,
  listContacts,
  updateContact,
} from "@/lib/api"
import type { Contact, ContactCreate } from "@/lib/types"

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  useEffect(() => {
    // wait after typing stops before searching, so doesnt fetch on every keystroke
    const t = setTimeout(() => {
      setLoading(true)
      listContacts(search || undefined)
        .then(setContacts)
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(t)
  }, [search])

  async function handleCreate(data: ContactCreate) {
    try {
      const created = await createContact(data)
      setContacts((prev) => [created, ...prev])
      toast.success("Contact added")
      closeForm()
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  async function handleUpdate(id: string, data: ContactCreate) {
    try {
      const updated = await updateContact(id, data)
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)))
      toast.success("Contact updated")
      closeForm()
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  async function handleDelete(contact: Contact) {
    const confirmed = window.confirm(
      `Delete ${contact.first_name} ${contact.last_name}?`,
    )
    if (!confirmed) return
    try {
      await deleteContact(contact.id)
      setContacts((prev) => prev.filter((c) => c.id !== contact.id))
      toast.success("Contact deleted")
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  function openAdd() {
    setEditingContact(null)
    setFormOpen(true)
  }

  function openEdit(contact: Contact) {
    setEditingContact(contact)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
  }

  return (
    <div className="min-h-screen bg-kinective-bg flex flex-col">
      <Header onAdd={openAdd} />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-6 space-y-4">
        <SearchBar value={search} onChange={setSearch} />
        <ContactList
          contacts={contacts}
          loading={loading}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </main>
      <footer className="text-center text-xs text-kinective-muted py-6">
        Built by Kavi Lu · Kinective Assessment 2026
      </footer>
      <ContactForm
        open={formOpen}
        contact={editingContact}
        onClose={closeForm}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />
      <Toaster position="bottom-right" />
    </div>
  )
}
