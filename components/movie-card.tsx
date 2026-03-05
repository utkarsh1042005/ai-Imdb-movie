import { Card, CardContent } from "@/components/ui/card"
import { Star, Calendar, Users } from "lucide-react"
import Image from "next/image"

export interface MovieData {
  title: string
  year: string
  rating: string
  poster: string
  cast: string[]
  plot: string
}

interface MovieCardProps {
  movie: MovieData
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-300 hover:bg-white/[0.08] hover:shadow-black/50 hover:border-white/15">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Movie Poster */}
          <div className="relative w-full lg:w-80 shrink-0">
            <div className="aspect-[2/3] lg:aspect-auto lg:h-full relative">
              <Image
                src={movie.poster}
                alt={`${movie.title} poster`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-card/50" />
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex flex-col justify-center gap-8 p-8 lg:p-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl text-balance">
                {movie.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">{movie.rating}</span>
                  <span className="text-sm">/10 IMDb</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Users className="h-4 w-4" />
                <span>Cast</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm text-foreground/90 backdrop-blur-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Plot</h3>
              <p className="text-foreground/90 leading-relaxed text-pretty text-base">
                {movie.plot}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
