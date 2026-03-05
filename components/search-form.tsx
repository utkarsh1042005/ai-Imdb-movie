"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"

interface SearchFormProps {
  onSearch: (imdbId: string) => void
  isLoading: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [imdbId, setImdbId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imdbId.trim()) {
      onSearch(imdbId.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Enter IMDb ID (e.g., tt0133093)"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          className="h-14 pl-12 pr-4 text-base bg-white/5 border border-white/10 rounded-2xl shadow-xl shadow-black/30 backdrop-blur-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-white/[0.08] transition-all duration-200 placeholder:text-muted-foreground/70"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading || !imdbId.trim()}
        className="h-14 px-10 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all duration-200 shadow-xl shadow-primary/25 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Search Movie
          </>
        )}
      </Button>
    </form>
  )
}
