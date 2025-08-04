"use client";

import { motion } from "motion/react";
import React from "react";

// Animation variants
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

// Reusable animation components
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={fadeUpVariants}
    transition={{
      duration,
      delay,
      ease: [0.18, 0.89, 0.32, 1.30],
    }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={fadeInVariants}
    transition={{ duration, delay }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);

interface AnimatedCardProps {
  children: React.ReactNode;
  index?: number;
  baseDelay?: number;
  staggerDelay?: number;
  duration?: number;
  hoverY?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  index = 0,
  baseDelay = 0.2,
  staggerDelay = 0.1,
  duration = 0.5,
  hoverY = -5,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={cardVariants}
    transition={{
      duration,
      delay: baseDelay + index * staggerDelay,
      ease: [0.18, 0.89, 0.32, 1.15],
    }}
    viewport={{ once: true }}
    whileHover={{
      y: hoverY,
      transition: { duration: 0.2 },
    }}
  >
    {children}
  </motion.div>
);

// Animation presets
export const animationPresets = {
  // Standard fade up animation
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.18, 0.89, 0.32, 1.15] },
    viewport: { once: true },
  },

  // Quick fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  },

  // Card animation with scale
  card: {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: [0.18, 0.89, 0.32, 1.15] },
    viewport: { once: true },
  },
};
