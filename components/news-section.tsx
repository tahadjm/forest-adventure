"use client";
import { useEffect, useState } from "react";

import { getLastNews } from "@/lib/utils";
import NewsCard from "./news-card";
import { MockNews } from "@/lib/mock-data";

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [latestNews, setLastNews] = useState<News>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setNews(MockNews);
  }, []);
  useEffect(() => {
    setLoading(true);
    const lastNews: News = getLastNews(news);
    setLastNews(lastNews);
    setLoading(false);
  }, [news]);
  return (
    <section className="min-h-screen">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        <div className="flex flex-col items-center justify-center h-full">
          <header className="text-center">
            <h1 className="font-bold text-xl sm:text-2xl text-primary mb-2 sm:mb-3">
              Dernières nouvelles chez Forest Adventure Annaba
            </h1>
            <div className="w-12 sm:w-16 h-1 bg-accent-foreground mx-auto rounded-full" />
          </header>
          <NewsCard news={latestNews} />
        </div>
      </div>
    </section>
  );
}
