'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: 'slide-up' | 'fade' | 'slide-left';
}

export function AnimatedCard({
  children,
  delay = 0,
  className,
  variant = 'slide-up',
}: AnimatedCardProps) {
  const variants = {
    'slide-up': {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: 'easeOut', delay },
    },
    'fade': {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3, ease: 'easeOut', delay },
    },
    'slide-left': {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, ease: 'easeOut', delay },
    },
  };

  return (
    <motion.div
      className={className}
      initial={variants[variant].initial}
      animate={variants[variant].animate}
      transition={variants[variant].transition}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function AnimatedContainer({
  children,
  staggerDelay = 0.1,
  className,
}: AnimatedContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedNumber({
  value,
  duration = 1,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedNumberProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration }}
    >
      {prefix}
      {value.toLocaleString('en-US', { maximumFractionDigits: decimals })}
      {suffix}
    </motion.span>
  );
}
