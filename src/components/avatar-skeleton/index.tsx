import { cn } from '@/lib/utils';

export function AvatarSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted',
        className
      )}
      aria-busy="true"
      aria-label="Loading profile menu"
    />
  );
}
