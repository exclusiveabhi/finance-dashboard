'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ShimmerSkeleton } from './shimmer-skeleton';

export function DashboardLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <ShimmerSkeleton className="h-8 w-32" />
        <ShimmerSkeleton className="h-5 w-64" />
      </div>

      {/* Summary cards skeleton */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="border-border bg-card">
            <CardHeader>
              <div className="space-y-2">
                <ShimmerSkeleton className="h-4 w-24" />
                <ShimmerSkeleton className="h-8 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <ShimmerSkeleton className="h-4 w-40" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-border bg-card">
            <CardHeader>
              <ShimmerSkeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <ShimmerSkeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transactions skeleton */}
      <Card className="border-border bg-card">
        <CardHeader>
          <ShimmerSkeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ShimmerSkeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
