import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#FED9B7] to-[#f7b79c] text-[#14204d] shadow-2xl hover:shadow-[0_20px_60px_rgba(254,217,183,0.4)] hover:scale-105 focus:ring-[#FED9B7]",
    secondary:
      "bg-gradient-to-r from-[#14204d] via-[#1f2d64] to-[#14204d] text-white shadow-2xl hover:shadow-[0_20px_60px_rgba(20,32,77,0.4)] hover:scale-105 focus:ring-[#14204d]",
    ghost:
      "bg-transparent text-[#14204d] hover:bg-[#14204d]/10 hover:text-[#FED9B7] focus:ring-[#FED9B7]",
    outline:
      "bg-white border-2 border-[#FED9B7] text-[#FED9B7] hover:bg-[#FED9B7]/20 shadow-inner hover:shadow-lg focus:ring-[#FED9B7]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Glow subtil animé */}
      <span className="absolute inset-0 bg-gradient-to-br from-[#FED9B7]/20 via-[#FED9B7]/10 to-[#14204d]/10 rounded-xl pointer-events-none animate-buttonGlow"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
