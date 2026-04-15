import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAdd: () => void
}

export function Header({ onAdd }: HeaderProps) {
  return (
    <header className="border-b border-kinective-border bg-kinective-dark">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-kinective-accent rounded-full" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-kinective-text">
              Kinective Address Book
            </h1>
            <p className="text-sm text-kinective-muted mt-0.5">
              Manage your contacts
            </p>
          </div>
        </div>
        <Button onClick={onAdd} className="bg-kinective-accent text-kinective-dark hover:bg-kinective-accent/90 font-semibold">
          <Plus className="h-4 w-4" />
          Add contact
        </Button>
      </div>
    </header>
  )
}
