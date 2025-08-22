import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { ArrowRight } from "lucide-react";
import { MaxWidthWrapper } from "@/components/ui/MaxWidthWrapper";
import { ParksCard } from "@/components/parks-card";
import { HistorySection } from "@/components/history-section";
import NewsSection from "@/components/news-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection
        title="Partez à la découverte des parcs d'aventure !"
        description="Venez découvrir l'accrobranche en Algérie, une expérience inoubliable et palpitante à vivre en famille ou entre amis !"
        videoSrc="/clip.mp4"
        height="small"
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/park">
              Explorer les parcs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-background/20 backdrop-blur-sm hover:bg-background/30"
          >
            En savoir plus
          </Button>
        </div>
      </HeroSection>
      <MaxWidthWrapper className="mt-16 mb-20">
        <ParksCard />
        <NewsSection />
        <HistorySection />
      </MaxWidthWrapper>
    </main>
  );
}
