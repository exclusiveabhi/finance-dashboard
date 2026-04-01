import { cn } from '@/lib/utils';

interface ShimmerSkeletonProps {
  className?: string;
  count?: number;
}

export function ShimmerSkeleton({ className, count = 1 }: ShimmerSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'bg-gradient-to-r from-card via-muted to-card bg-[length:200%_100%] animate-shimmer rounded-lg',
            className
          )}
        />
      ))}
    </>
  );
}

export function CardSkeletonLoading() {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      <ShimmerSkeleton className="h-6 w-24" />
      <ShimmerSkeleton className="h-10 w-full" />
      <ShimmerSkeleton className="h-20 w-full" />
    </div>
  );
}

export function TableSkeletonLoading() {
  return (
    <div className="space-y-3">
      <ShimmerSkeleton className="h-10 w-full" />
      <ShimmerSkeleton className="h-10 w-full" />
      <ShimmerSkeleton className="h-10 w-full" />
      <ShimmerSkeleton className="h-10 w-full" />
    </div>
  );
}
