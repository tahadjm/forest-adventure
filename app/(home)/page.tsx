import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { ArrowRight } from "lucide-react";
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
    </main>
  );
}
