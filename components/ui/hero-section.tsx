"use client";

import type React from "react";
import { useState, useRef } from "react"; // Added useState and useRef for mute functionality
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react"; // Added volume icons
import { Button } from "@/components/ui/button"; // Added Button component
import { MaxWidthWrapper } from "./MaxWidthWrapper";

type HeroSectionProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  videoSrc?: string;
  backgroundOverlay?: boolean;
  height?: "small" | "medium" | "large" | "custom";
  className?: string;
  align?: "left" | "center" | "right";
};

export function HeroSection({
  title,
  description,
  children,
  videoSrc,
  backgroundOverlay = true,
  height = "medium",
  className,
  align = "center",
}: HeroSectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  console.log("Hero Section Video Source:", videoSrc);
  const heightClasses = {
    small: "py-12 md:py-16",
    medium: "py-16 md:py-24",
    large: "py-20 md:py-32 lg:py-40",
    custom: "",
  };

  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        heightClasses[height],
        className
      )}
    >
      {videoSrc ? (
        <div className="absolute inset-0 w-full h-full">
          <motion.video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSrc}
            crossOrigin="anonymous"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            Your browser does not support the video tag.
          </motion.video>

          {backgroundOverlay && (
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          )}

          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 200,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleMute}
                className="bg-black/20 hover:bg-black/40 text-white border-white/20 backdrop-blur-sm transition-all duration-300 hover:backdrop-blur-md"
              >
                <motion.div
                  key={isMuted ? "muted" : "unmuted"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </motion.div>
                <span className="sr-only">
                  {isMuted ? "Unmute video" : "Mute video"}
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-muted/80 to-muted">
          {backgroundOverlay && (
            <div className="absolute inset-0 bg-black/30" />
          )}
        </div>
      )}

      <MaxWidthWrapper>
        <div className="container relative z-10 h-full flex flex-col justify-center">
          <div
            className={cn(
              "max-w-3xl mx-auto flex flex-col gap-4",
              alignClasses[align]
            )}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className={cn(
                "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
                videoSrc && "text-white"
              )}
            >
              {title}
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={cn(
                  "text-lg md:text-sm",
                  videoSrc ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {description}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  type: "spring",
                  stiffness: 120,
                  damping: 25,
                }}
                className="mt-2"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
