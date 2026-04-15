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
  const [page, setPage] = useState(0)
  const PAGE_SIZE = 5

  // reset to first page when search changes
  useEffect(() => setPage(0), [search])

  useEffect(() => {
    // wait after typing stops before searching, so doesnt fetch on every keystroke
    const t = setTimeout(() => {
      setLoading(true)
      listContacts(search || undefined, page * PAGE_SIZE, PAGE_SIZE)
        .then(setContacts)
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(t)
  }, [search, page])

  // to make sure page always displays 5 contacts even after create new contact
  async function refetch() {
    setContacts(await listContacts(search || undefined, page * PAGE_SIZE, PAGE_SIZE))
  }

  async function handleCreate(data: ContactCreate) {
    try {
      await createContact(data)
      toast.success("Contact added")
      closeForm()
      await refetch()
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  async function handleUpdate(id: string, data: ContactCreate) {
    try {
      await updateContact(id, data)
      toast.success("Contact updated")
      closeForm()
      await refetch()
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
      toast.success("Contact deleted")
      await refetch()
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
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="px-3 py-1 text-sm rounded border border-slate-200 disabled:opacity-40 hover:cursor-pointer"
          >
            Prev
          </button>
          <span className="text-sm text-kinective-muted">Page {page + 1}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={contacts.length < PAGE_SIZE}
            className="px-3 py-1 text-sm rounded border border-slate-200 disabled:opacity-40 hover:cursor-pointer"
          >
            Next
          </button>
        </div>
      </main>
      <footer className="text-center text-kinective-muted py-6 text-base">
        Kavi Lu
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
