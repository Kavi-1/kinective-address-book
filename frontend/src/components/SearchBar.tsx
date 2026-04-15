import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-kinective-muted" />
      <Input
        type="search"
        placeholder="Search by name, email, phone, or company..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 py-5 bg-slate-50 border-slate-200"
      />
    </div>
  )
}
