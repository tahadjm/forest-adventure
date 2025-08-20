"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parks } from "@/lib/mock-data";

/* ------------------------------
 * Animation Variants
 * ------------------------------ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const hoverVariants: Variants = {
  hover: {
    y: -6,
    scale: 1.03,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

/* ------------------------------
 * Utility
 * ------------------------------ */
const getGridClasses = (count: number) => {
  if (count === 0) return "grid grid-cols-1";
  if (count === 1) return "grid grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto";
  return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

/* ------------------------------
 * Subcomponent: ParkCardItem
 * ------------------------------ */
const ParkCardItem = ({ park }: { park: (typeof parks)[number] }) => (
  <motion.div variants={fadeUp} whileHover="hover" className="w-full max-w-xs">
    <motion.div variants={hoverVariants}>
      <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-0 bg-card/60 backdrop-blur-sm">
        {/* Image */}
        <div className="relative h-44 overflow-hidden group">
          <Image
            src={park.imageUrl || "/placeholder.svg"}
            alt={`Vue du ${park.name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Content */}
        <CardHeader className="space-y-3 p-4">
          <div className="flex flex-col items-start gap-2">
            <CardTitle className="text-lg font-semibold leading-tight text-card-foreground">
              {park.name}
            </CardTitle>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium"
            >
              <MapPin className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">Localisation:</span>
              {park.location}
            </Badge>
          </div>
          <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {park.description || "Aucune description disponible"}
          </CardDescription>
        </CardHeader>

        {/* Footer */}
        <CardFooter className="p-4 pt-0">
          <Button asChild size="sm" className="w-full group hover:bg-primary/90">
            <Link
              href={`/park/${park.id}`}
              className="flex items-center justify-center gap-2 text-sm"
              aria-label={`Explorer le parc ${park.name}`}
            >
              Explorer le Parc
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  </motion.div>
);

/* ------------------------------
 * Main Component: ParksCard
 * ------------------------------ */
export const ParksCard = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Run animation only once on mount
  useEffect(() => {
    if (!hasAnimated) setHasAnimated(true);
  }, [hasAnimated]);

  const hasParks = parks && parks.length > 0;

  return (
    <section
      className="container mx-auto px-4 py-12"
      role="main"
      aria-label="Parcs disponibles"
    >
      {/* Header */}
      <motion.div
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
        variants={containerStagger}
        className="flex flex-col items-center text-center mb-12"
      >
        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold mb-4"
        >
          Découvrez nos Parcs
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-lg text-muted-foreground max-w-2xl"
        >
          Explorez des destinations exceptionnelles et vivez des aventures
          inoubliables
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className={`${getGridClasses(parks.length)} gap-10 place-items-center`}
        variants={containerStagger}
        initial="hidden"
        animate={hasAnimated ? "visible" : "hidden"}
      >
        {hasParks ? (
          parks.map((park) => <ParkCardItem key={park.id} park={park} />)
        ) : (
          <motion.div
            variants={fadeUp}
            className="col-span-full flex flex-col items-center justify-center py-16 px-4"
          >
            <p className="text-center text-muted-foreground text-lg font-medium">
              Aucun parc trouvé.
            </p>
            <p className="text-center text-muted-foreground/70 text-sm mt-2">
              Revenez plus tard pour découvrir de nouveaux parcs.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
