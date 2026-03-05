"use client"

import { useState } from "react"
import { SearchForm } from "@/components/search-form"
import { MovieCard } from "@/components/movie-card"
import { InsightCard} from "@/components/insight-card"
import { Film, Sparkles } from "lucide-react"

// Mock data for demonstration

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [movieData, setMovieData] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = async (imdbId) => {

    setIsLoading(true)
    setError(null)
    setMovieData(null)
  
    try {
  
      const res = await fetch(`/api/movie?id=${imdbId}`)
      const data = await res.json()
  
      if (data.Response === "False") {
        setError("Movie not found")
      } else {
  
        const movie = {
          title: data.movie.Title,
          year: data.movie.Year,
          rating: data.movie.imdbRating,
          poster: data.movie.Poster,
          cast: data.movie.Actors.split(",").map(a => a.trim()),
          plot: data.movie.Plot
        }
        
        const sentiment = data.insight.sentiment?.toLowerCase()

let normalized = "Mixed"

if (sentiment === "positive") normalized = "Positive"
if (sentiment === "negative") normalized = "Negative"

const insight = {
  summary: data.insight.summary,
  sentiment: normalized
}
        
       
  
        setMovieData({ movie, insight })
      }
  
    } catch (err) {
      setError("Error fetching movie")
    }
  
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <div className="mb-8 inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur-xl">
            <Film className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground/70">
              AI-Powered Movie Analysis
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            AI Movie Insight Builder
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Enter an IMDb movie ID to get AI-powered audience insights and comprehensive movie details.
          </p>
        </header>

        {/* Search Section */}
        <section className="mb-16">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {/* Error State */}
        {error && (
          <div className="mb-10 rounded-2xl border border-destructive/30 bg-destructive/10 backdrop-blur-xl p-6 text-center">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/30">
              <Sparkles className="h-10 w-10 animate-pulse text-primary-foreground" />
            </div>
            <p className="text-xl font-semibold text-foreground">Analyzing movie data...</p>
            <p className="mt-2 text-muted-foreground">Generating AI insights</p>
          </div>
        )}

        {/* Results Section */}
        {movieData && !isLoading && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <MovieCard movie={movieData.movie} />
            <InsightCard insight={movieData.insight} />
          </div>
        )}

        {/* Empty State */}
        {!movieData && !isLoading && !error && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <Film className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">No movie selected</h3>
            <p className="mt-3 max-w-sm text-muted-foreground leading-relaxed">
              Enter an IMDb ID above to get started. Try tt0133093 for The Matrix.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
