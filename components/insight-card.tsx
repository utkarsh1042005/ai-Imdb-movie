import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ThumbsUp, ThumbsDown, Minus } from "lucide-react"

export interface InsightData {
  summary: string
  sentiment: "Positive" | "Mixed" | "Negative"
}

interface InsightCardProps {
  insight: InsightData
}

const sentimentConfig = {
  Positive: {
    icon: ThumbsUp,
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    label: "Positive Sentiment",
  },
  Mixed: {
    icon: Minus,
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
    label: "Mixed Sentiment",
  },
  Negative: {
    icon: ThumbsDown,
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-400",
    label: "Negative Sentiment",
  },
}

export function InsightCard({ insight }: InsightCardProps) {
  const config = sentimentConfig[insight.sentiment]
  const SentimentIcon = config.icon

  return (
    <Card className="relative overflow-hidden border border-primary/30 bg-gradient-to-br from-primary/10 via-white/5 to-accent/10 backdrop-blur-xl shadow-2xl shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 hover:border-primary/40">
      {/* Glow effect */}
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
      
      <CardHeader className="relative pb-6 pt-8">
        <CardTitle className="flex items-center gap-4 text-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          AI Audience Insight
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-8 pb-8">
        <p className="text-foreground/90 leading-relaxed text-pretty text-base">
          {insight.summary}
        </p>

        <div
          className={`inline-flex items-center gap-4 rounded-2xl border-2 px-6 py-4 backdrop-blur-sm ${config.bgColor} ${config.borderColor}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.bgColor}`}>
            <SentimentIcon className={`h-5 w-5 ${config.textColor}`} />
          </div>
          <div>
            <p className={`font-bold text-lg ${config.textColor}`}>
              {insight.sentiment}
            </p>
            <p className="text-sm text-muted-foreground">{config.label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
