import type { Contact } from "@/lib/types"
import { ContactRow } from "./ContactRow"

interface ContactListProps {
  contacts: Contact[]
  loading: boolean
  onEdit: (contact: Contact) => void
  onDelete: (contact: Contact) => void
}

export function ContactList({ contacts, loading, onEdit, onDelete }: ContactListProps) {
  if (loading) {
    return (
      <div className="py-16 text-center text-kinective-muted text-sm">
        Loading contacts...
      </div>
    )
  }

  if (contacts.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-kinective-dark font-medium">No contacts yet</p>
        <p className="text-sm text-kinective-muted mt-1">
          Click "Add contact" to create your first one.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-lg shadow-kinective-blue/20 ring-1 ring-kinective-blue/10">
      {contacts.map((c) => (
        <ContactRow key={c.id} contact={c} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
