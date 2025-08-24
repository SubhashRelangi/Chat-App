// components/SidebarSkeleton.jsx
export default function SidebarSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg animate-pulse bg-base-100/20"
        >
          <div className="w-12 h-12 rounded-full bg-base-content/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-base-content/10 rounded" />
            <div className="h-3 w-1/2 bg-base-content/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}