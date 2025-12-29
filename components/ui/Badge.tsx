import { twMerge } from "tailwind-merge";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function Badge({ children, className }: BadgeProps) {
    return (
        <span
            className={twMerge(
                "inline-flex items-center rounded-full border border-primary/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary",
                className
            )}
        >
            {children}
        </span>
    );
}
