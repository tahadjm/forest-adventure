"use client"

import Image from "next/image"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ImageIcon } from "lucide-react"

interface News {
  id?: string
  title: string
  content: string
  imageUrl?: string
  category?: string
  author?: string
  startDate?: string
  endDate?: string
}

export default function EnhancedNewsCard({
  news,
  isLoading = false,
}: {
  news?: News
  isLoading?: boolean
}) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  if (isLoading || !news) {
    return (
      <div className="bg-background min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-6 sm:mb-8">
            <Skeleton className="h-6 sm:h-8 w-64 sm:w-80 mx-auto mb-2" />
            <Skeleton className="h-1 w-16 sm:w-24 mx-auto" />
          </div>

          {/* Card skeleton */}
          <Card className="overflow-hidden">
            <Skeleton className="h-48 sm:h-56 md:h-64 w-full" />
            <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <Skeleton className="h-6 sm:h-8 w-3/4" />
              <Skeleton className="h-5 sm:h-6 w-32 sm:w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex flex-wrap gap-2 pt-2">
                <Skeleton className="h-7 sm:h-8 w-16 sm:w-20 rounded-full" />
                <Skeleton className="h-7 sm:h-8 w-20 sm:w-24 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const formatDateRange = (startDate?: string, endDate?: string): string | null => {
    if (!startDate && !endDate) return null

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }

    if (startDate && endDate) {
      return `du ${formatDate(startDate)} au ${formatDate(endDate)}`
    }

    if (startDate) {
      return `à partir du ${formatDate(startDate)}`
    }

    if (endDate) {
      return `jusqu'au ${formatDate(endDate)}`
    }

    return null
  }

  const dateRange = formatDateRange(news.startDate, news.endDate)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <Card className="overflow-hidden m-0 gap-3 rounded-sm border-0 shadow-none ">
          {news.imageUrl && (
            <div className="relative h-48 w-full overflow-hidden bg-muted">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 w-full h-full bg-muted animate-pulse flex items-center justify-center">
                  <ImageIcon className="w-8 sm:w-12 h-8 sm:h-12 text-muted-foreground" />
                </div>
              )}

              {!imageError && (
                <Image
                  src={news.imageUrl || "/placeholder.svg"}
                  alt={`Image illustrant: ${news.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
                  className={`object-cover transition-all duration-500 ${
                    imageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
                  }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true)
                    setImageLoading(false)
                  }}
                  priority
                />
              )}

              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
                  <div className="text-center space-y-2">
                    <ImageIcon className="w-12 sm:w-16 h-12 sm:h-16 mx-auto opacity-50" />
                    <p className="text-xs sm:text-sm font-medium px-4">Image non disponible</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <CardContent className="space-y-3 p-0">
            <h2 className="font-serif font-bold text-lg sm:text-xl text-card-foreground leading-tight">{news.title}</h2>

            {dateRange && (
              <div className="relative">
                <div className="inline-flex items-center gap-3 rounded-lg border-none">
                  <div className="flex items-center justify-center w-8 h-8 ">
                    <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm sm:text-base">
                      {dateRange}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="text-muted-foreground leading-relaxed">{news.content}</p>
            </div>

            <div className="flex flex-wrap gap-2 ">
              {news.category && (
                <Badge
                  variant="secondary"
                  className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-secondary/10 text-secondary-foreground border border-secondary/20 hover:bg-secondary/20 transition-colors"
                >
                  {news.category}
                </Badge>
              )}
              {news.author && (
                <Badge className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-1 sm:gap-1.5">
                  <User className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  <span className="truncate max-w-24 sm:max-w-none">{news.author}</span>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
