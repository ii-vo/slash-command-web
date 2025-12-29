export function PlusCorner({
  position,
  className = "",
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} w-3 h-3 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-300 dark:bg-zinc-700 -translate-y-1/2" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-zinc-300 dark:bg-zinc-700 -translate-x-1/2" />
    </div>
  );
}
