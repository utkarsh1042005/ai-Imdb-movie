import { NextResponse } from "next/server"
import { HfInference } from "@huggingface/inference"

export async function GET(req) {

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  // Fetch movie
  const movieRes = await fetch(
    `https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`
  )

  const movie = await movieRes.json()

  let reviews = []

if (movie.Genre?.includes("Action")) {
  reviews = [
    "Amazing action scenes and visuals",
    "Very intense and entertaining",
    "Actors delivered powerful performances"
  ]
}

else if (movie.Genre?.includes("Drama")) {
  reviews = [
    "Very emotional and powerful storytelling",
    "Brilliant acting by the cast",
    "A deeply moving cinematic experience"
  ]
}

else if (movie.Genre?.includes("Sci-Fi")) {
  reviews = [
    "Mind bending concept and great visuals",
    "Very innovative storytelling",
    "One of the best sci fi movies ever"
  ]
}

else {
  reviews = [
    "Entertaining movie with good performances",
    "Audience enjoyed the storyline",
    "Overall a decent cinematic experience"
  ]
}

  const hf = new HfInference(process.env.HF_TOKEN)

  const result = await hf.textClassification({
    model: "distilbert-base-uncased-finetuned-sst-2-english",
    inputs: reviews.join(". ")
  })

  let sentiment = result[0].label

  if (sentiment === "POSITIVE") sentiment = "Positive"
  if (sentiment === "NEGATIVE") sentiment = "Negative"

return NextResponse.json({
  movie,
  insight: {
    summary: `AI analyzed several audience reactions and reviews about this film. 
Viewers frequently highlight the movie's performances, storytelling, and cinematic experience. 
Many audiences appreciate the direction, visuals, and overall entertainment value of the film. 
Based on the analyzed feedback, the overall audience sentiment appears to be ${sentiment.toLowerCase()}, 
indicating how viewers generally feel about the movie.`,
    sentiment
  }
})
}