import type { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties; // ✅ Autorise l’utilisation de style inline (animationDelay, etc.)
}

export default function Card({
  children,
  className = "",
  hover = true,
  style,
}: CardProps) {
  return (
    <div
      style={style} // ✅ Applique le style transmis
      className={`
        relative
        bg-white/20 backdrop-blur-lg
        border border-white/30
        rounded-3xl
        shadow-2xl
        overflow-hidden
        transition-all duration-500
        ${hover ? "hover:scale-105 hover:-translate-y-1" : ""}
        hover:shadow-[0_20px_60px_rgba(254,217,183,0.4)]
        ${className}
      `}
    >
      {/* 💫 Glow subtil pour effet premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FED9B7]/20 via-[#FED9B7]/10 to-[#14204d]/10 rounded-3xl pointer-events-none animate-cardGlow"></div>

      {/* Contenu interne */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
