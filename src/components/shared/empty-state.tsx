import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, children, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h3 className="font-semibold text-base mb-1">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm max-w-xs">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
