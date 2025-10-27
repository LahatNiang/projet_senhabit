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
    new: "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-md hover:shadow-lg",
    featured:
      "bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] shadow-md hover:shadow-lg",
    exclusive:
      "bg-gradient-to-r from-[#14204d] via-[#1f2d64] to-[#14204d] text-white shadow-md hover:shadow-lg",
  };

  return (
    <span
      className={`
        relative
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        transition-all duration-500
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Glow subtil pour effet premium */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-white/5 to-white/10 pointer-events-none animate-badgeGlow"></span>
      <span className="relative z-10">{children}</span>
    </span>
  );
}
