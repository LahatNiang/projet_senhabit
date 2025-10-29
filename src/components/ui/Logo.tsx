import { Building2, Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className = "",
  showText = true,
  size = "md",
}: LogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-lg", container: "p-2" },
    md: { icon: "w-8 h-8", text: "text-2xl", container: "p-3" },
    lg: { icon: "w-12 h-12", text: "text-4xl", container: "p-4" },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative group">
        {/* Glow arrière-plan doré subtil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7b79c]/40 via-[#f7b79c]/20 to-[#14204d]/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>

        {/* Conteneur icône */}
        <div
          className={`relative bg-gradient-to-br from-[#14204d]/80 via-[#1f2d64]/60 to-[#f7b79c]/50 ${sizes[size].container} 
          rounded-3xl shadow-2xl group-hover:shadow-[0_0_50px_rgba(254,217,183,0.6)] 
          group-hover:scale-110 transition-all duration-500 flex items-center justify-center animate-logoPulse`}
        >
          <Building2 className={`${sizes[size].icon} text-[#f7b79c]`} />
          <Sparkles className="w-3 h-3 text-[#f7b79c] absolute -top-1 -right-1 animate-spin-slow" />
        </div>
      </div>

      {/* Texte Logo */}
      {showText && (
        <div>
          <h1
            className={`${sizes[size].text} font-display font-bold bg-gradient-to-r from-[#14204d] to-[#14204d] bg-clip-text text-transparent`}
          >
            SEN{" "}
            <span className="hover:text-[#14204d] transition-colors duration-500">
              HABITA
            </span>
          </h1>
          <p className="text-xs text-[#14204d]/80 font-sans">
            Immobilier de Prestige - Sénégal
          </p>
        </div>
      )}
    </div>
  );
}
