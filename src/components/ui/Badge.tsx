import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "new" | "featured" | "exclusive";
  className?: string;
}

export default function Badge({
  children,
  variant = "new",
  className = "",
}: BadgeProps) {
  const variants = {
    new: "bg-emerald-500 text-white",
    featured: "bg-gold-500 text-white",
    exclusive: "bg-navy-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
