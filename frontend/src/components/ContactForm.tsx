import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Contact, ContactCreate } from "@/lib/types"

interface ContactFormProps {
  open: boolean
  contact: Contact | null
  onClose: () => void
  onCreate: (data: ContactCreate) => Promise<void>
  onUpdate: (id: string, data: ContactCreate) => Promise<void>
}

const EMPTY: ContactCreate = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  company: "",
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ open, contact, onClose, onCreate, onUpdate }: ContactFormProps) {
  const [form, setForm] = useState<ContactCreate>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (contact) {
      setForm({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone ?? "",
        address: contact.address ?? "",
        company: contact.company ?? "",
      })
    } else {
      setForm(EMPTY)
    }
    setErrors({})
  }, [contact, open]) // re run when modal opens so form resets each time

  const isEdit = contact !== null
  const title = isEdit ? "Edit contact" : "Add contact"

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.first_name.trim()) e.first_name = "Required"
    if (!form.last_name.trim()) e.last_name = "Required"
    if (!form.email.trim()) e.email = "Required"
    else if (!EMAIL_RE.test(form.email)) e.email = "Invalid email"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    if (!validate()) return

    // send null instead of empty string for optional fields
    const payload: ContactCreate = {
      ...form,
      phone: form.phone?.trim() || null,
      address: form.address?.trim() || null,
      company: form.company?.trim() || null,
    }

    setSubmitting(true)
    if (contact) await onUpdate(contact.id, payload)
    else await onCreate(payload)
    setSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-kinective-blue border-white/10 text-white sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-kinective-accent rounded-full" />
              <DialogTitle className="text-white tracking-tight">{title}</DialogTitle>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="first_name" className="text-white/70 text-xs uppercase tracking-wider">First name *</Label>
              <Input
                id="first_name"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                className="bg-kinective-dark/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-kinective-accent/50 focus-visible:border-kinective-accent/50"
              />
              {errors.first_name && <p className="text-xs text-red-300">{errors.first_name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last_name" className="text-white/70 text-xs uppercase tracking-wider">Last name *</Label>
              <Input
                id="last_name"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                className="bg-kinective-dark/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-kinective-accent/50 focus-visible:border-kinective-accent/50"
              />
              {errors.last_name && <p className="text-xs text-red-300">{errors.last_name}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-white/70 text-xs uppercase tracking-wider">Email *</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-kinective-dark/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-kinective-accent/50 focus-visible:border-kinective-accent/50"
            />
            {errors.email && <p className="text-xs text-red-300">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-white/70 text-xs uppercase tracking-wider">Phone</Label>
              <Input
                id="phone"
                value={form.phone ?? ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-kinective-dark/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-kinective-accent/50 focus-visible:border-kinective-accent/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-white/70 text-xs uppercase tracking-wider">Company</Label>
              <Input
                id="company"
                value={form.company ?? ""}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="bg-kinective-dark/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-kinective-accent/50 focus-visible:border-kinective-accent/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-white/70 text-xs uppercase tracking-wider">Address</Label>
            <Input
              id="address"
              value={form.address ?? ""}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="bg-kinective-dark/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-kinective-accent/50 focus-visible:border-kinective-accent/50"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-kinective-accent text-kinective-dark hover:bg-kinective-accent/90 font-semibold"
            >
              {submitting ? "Saving..." : isEdit ? "Save changes" : "Create contact"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
