export interface Contact {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  address: string | null
  company: string | null
  created_at: string
}

export interface ContactCreate {
  first_name: string
  last_name: string
  email: string
  phone?: string | null
  address?: string | null
  company?: string | null
}

export type ContactUpdate = Partial<ContactCreate>
