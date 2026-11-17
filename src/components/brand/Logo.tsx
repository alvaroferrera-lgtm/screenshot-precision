import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <rect width="32" height="32" rx="8" className="fill-ink" />
      <path
        d="M9 11.5A3.5 3.5 0 0 1 12.5 8h7A3.5 3.5 0 0 1 23 11.5v4a3.5 3.5 0 0 1-3.5 3.5H15l-4 3.5V19h-.5A1.5 1.5 0 0 1 9 17.5z"
        className="fill-primary"
      />
      <circle cx="13.5" cy="13.5" r="1.25" className="fill-ink" />
      <circle cx="18.5" cy="13.5" r="1.25" className="fill-ink" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[15px] font-semibold tracking-[-0.02em]",
          inverted ? "text-ink-foreground" : "text-foreground",
        )}
      >
        CONVERSA<span className="text-primary">AI</span>
      </span>
    </span>
  );
}
