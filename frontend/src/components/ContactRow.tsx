import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Contact } from "@/lib/types"

interface ContactRowProps {
  contact: Contact
  onEdit: (contact: Contact) => void
  onDelete: (contact: Contact) => void
}

export function ContactRow({ contact, onEdit, onDelete }: ContactRowProps) {
  const initials = `${contact.first_name[0] ?? ""}${contact.last_name[0] ?? ""}`.toUpperCase()

  return (
    <div className="relative flex items-center gap-4 px-5 py-4 bg-kinective-blue hover:bg-kinective-dark transition-colors duration-200 border-b border-white/10 last:border-b-0">
      <div className="h-11 w-11 rounded-full bg-kinective-accent flex items-center justify-center text-kinective-dark font-bold text-sm shrink-0 shadow-md shadow-kinective-accent/30">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-white truncate tracking-tight">
          {contact.first_name} {contact.last_name}
        </div>
        <div className="text-sm text-white/70 truncate flex items-center gap-3 mt-0.5">
          <span>{contact.email}</span>
          {contact.phone && (
            <>
              <span className="text-white/30">·</span>
              <span className="text-white/60">{contact.phone}</span>
            </>
          )}
          {contact.company && (
            <>
              <span className="text-white/30">·</span>
              <span className="text-white/60">{contact.company}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(contact)}
          aria-label="Edit"
          className="text-white/70 hover:text-kinective-accent hover:bg-white/10"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(contact)}
          aria-label="Delete"
          className="text-white/70 hover:text-red-300 hover:bg-white/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
