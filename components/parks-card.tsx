"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parks } from "@/lib/mock-data";
import HeaderSection from "./ui/header-section";

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

const getGridClasses = (count: number) => {
  if (count === 0) return "grid grid-cols-1";
  if (count === 1) return "grid grid-cols-1 max-w-sm mx-auto";
  if (count === 2) return "grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto";
  return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
};

const ParkCardSkeleton = () => (
  <motion.div variants={fadeUp} className="w-full max-w-xs">
    <Card className="overflow-hidden shadow-md border-0 bg-card/60 backdrop-blur-sm">
      {/* Image Skeleton */}
      <div className="relative h-44 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Skeleton */}
      <CardHeader className="space-y-3 p-4">
        <div className="flex flex-col items-start gap-2">
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4" />

          {/* Badge Skeleton */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardHeader>

      {/* Footer Skeleton */}
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  </motion.div>
);

const ParkCardItem = ({ park }: { park: (typeof parks)[number] }) => (
  <motion.div variants={fadeUp} whileHover="hover" className="w-full max-w-xs">
    <motion.div variants={hoverVariants}>
      <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-400 border-0 bg-card/60 backdrop-blur-sm rounded-sm pt-0">
        <div className="relative h-44 overflow-hidden group">
          <Image
            src={park.imageUrl || "/placeholder.svg"}
            alt={`Vue du ${park.name}`}
            fill
            className="object-fill transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw"
          />
        </div>

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

        <CardFooter className="p-4 pt-0">
          <Button
            asChild
            size="sm"
            className="w-full group hover:bg-primary/90"
          >
            <Link
              href={`/park/${park.id}`}
              className="flex items-center justify-center gap-2 text-sm"
              aria-label={`Explorer le parc ${park.name}`}
            >
              Explorer le Parc
              <ArrowRight className="h-3 w-3 transition-transform duration-400 group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  </motion.div>
);

const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <motion.div
    className={`${getGridClasses(count)} gap-10 place-items-center`}
    variants={containerStagger}
    initial="hidden"
    animate="visible"
  >
    {Array.from({ length: count }).map((_, index) => (
      <ParkCardSkeleton key={`skeleton-${index}`} />
    ))}
  </motion.div>
);

/* ------------------------------
 * Subcomponent: HeaderSkeleton
 * ------------------------------ */
const HeaderSkeleton = () => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={containerStagger}
    className="flex flex-col items-center text-center mb-12"
  >
    <motion.div variants={fadeUp} className="space-y-4">
      <Skeleton className="h-10 w-80 mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-96 mx-auto" />
        <Skeleton className="h-6 w-72 mx-auto" />
      </div>
    </motion.div>
  </motion.div>
);

/* ------------------------------
 * Main Component: ParksCard
 * ------------------------------ */
interface ParksCardProps {
  loading?: boolean;
  skeletonCount?: number;
}

export const ParksCard = ({
  loading = false,
  skeletonCount = 6,
}: ParksCardProps) => {
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
      {loading ? (
        <HeaderSkeleton />
      ) : (
        <HeaderSection
          title="Découvrez nos Parcs"
          subtitle="Explorez des destinations exceptionnelles et vivez des aventures
            inoubliables"
        />
      )}

      {loading ? (
        <SkeletonGrid count={skeletonCount} />
      ) : hasParks ? (
        <motion.div
          className={`${getGridClasses(
            parks.length
          )} gap-10 place-items-center`}
          variants={containerStagger}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
        >
          {parks.map((park) => (
            <ParkCardItem key={park.id} park={park} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className={`${getGridClasses(0)} gap-10 place-items-center`}
        >
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
        </motion.div>
      )}
    </section>
  );
};
