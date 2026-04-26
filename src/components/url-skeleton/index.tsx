export function UrlSkeleton() {
  return (
    <div className="flex rounded-lg border p-4 border-border justify-between animate-pulse">
      <div className="flex gap-4 flex-grow items-center">
        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-3 w-14 rounded bg-muted" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-5 w-5 rounded bg-muted" />
      </div>
    </div>
  );
}

export function UrlsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <UrlSkeleton key={index} />
      ))}
    </div>
  );
}
