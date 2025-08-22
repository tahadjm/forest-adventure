"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

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

interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
  hasAnimated?: boolean;
  align?: "left" | "center" | "right";
  verticalAlign?: "start" | "center" | "end";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  maxWidth?: string;
  marginBottom?: string;
  minHeight?: string;
}
const sizeConfig = {
  sm: {
    title: "text-2xl font-semibold",
    subtitle: "text-base",
    spacing: "mb-2",
  },
  md: {
    title: "text-3xl font-bold",
    subtitle: "text-lg",
    spacing: "mb-3",
  },
  lg: {
    title: "text-4xl font-bold",
    subtitle: "text-lg",
    spacing: "mb-4",
  },
  xl: {
    title: "text-5xl font-bold",
    subtitle: "text-xl",
    spacing: "mb-6",
  },
};

const alignmentClasses = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

const verticalAlignmentClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

export const HeaderSection = ({
  title,
  subtitle,
  hasAnimated = true,
  align = "center",
  verticalAlign = "start",
  size = "lg",
  className,
  titleClassName,
  subtitleClassName,
  maxWidth = "max-w-2xl",
  marginBottom = "mb-12",
  minHeight,
}: AnimatedSectionHeaderProps) => {
  const config = sizeConfig[size];

  return (
    <motion.div
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={containerStagger}
      className={cn(
        "flex flex-col",
        alignmentClasses[align],
        verticalAlignmentClasses[verticalAlign],
        marginBottom,
        minHeight && minHeight,
        className
      )}
    >
      <motion.h2
        variants={fadeUp}
        className={cn(config.title, config.spacing, titleClassName)}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            config.subtitle,
            "text-muted-foreground",
            maxWidth,
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default HeaderSection;
