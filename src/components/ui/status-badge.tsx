import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        applied: "bg-primary/10 text-primary",
        shortlisted: "bg-accent/10 text-accent",
        interview: "bg-warning/10 text-warning",
        rejected: "bg-destructive/10 text-destructive",
        success: "bg-success/10 text-success",
        pending: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props} />
  );
}
