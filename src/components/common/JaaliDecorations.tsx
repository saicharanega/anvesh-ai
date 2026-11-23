import React from 'react';

export const JaaliMotif: React.FC<{ className?: string; size?: number }> = ({ className = "text-heritage-gold", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`inline-block ${className}`}
  >
    {/* Geometric lattice and neural node motif */}
    <rect x="20" y="2" width="25.45" height="25.45" transform="rotate(45 20 2)" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6"/>
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.4"/>
    <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.8"/>
    <circle cx="20" cy="20" r="2.5" fill="currentColor" />
    <path d="M20 2V38M2 20H38" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
    <path d="M7.27 7.27L32.73 32.73M7.27 32.73L32.73 7.27" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
  </svg>
);

export const JaaliCorner: React.FC<{ position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; className?: string }> = ({ 
  position = 'top-left', 
  className = "text-heritage-gold opacity-50" 
}) => {
  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90'
  }[position];

  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      className={`absolute ${rotation} ${className} pointer-events-none`}
    >
      <path d="M2 22V6C2 3.79086 3.79086 2 6 2H22" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 18V9C6 7.34315 7.34315 6 9 6H18" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5"/>
      <circle cx="9" cy="9" r="2" fill="currentColor"/>
    </svg>
  );
};

export const JaaliDivider: React.FC<{ label?: string; className?: string }> = ({ 
  label, 
  className = "" 
}) => (
  <div className={`relative flex items-center justify-center my-6 ${className}`}>
    <div className="flex-grow border-t border-heritage-border/70"></div>
    {label && (
      <div className="flex items-center space-x-2 px-4 py-1 rounded-full bg-heritage-sandstone/60 border border-heritage-gold/30 text-heritage-green-800 text-xs font-medium">
        <JaaliMotif size={14} className="text-heritage-gold" />
        <span className="font-serif tracking-wider uppercase text-[11px]">{label}</span>
        <JaaliMotif size={14} className="text-heritage-gold" />
      </div>
    )}
    <div className="flex-grow border-t border-heritage-border/70"></div>
  </div>
);

export const HeritageBadge: React.FC<{ 
  variant?: 'gold' | 'forest' | 'terracotta' | 'neutral'; 
  children: React.ReactNode; 
  className?: string;
  icon?: React.ReactNode;
}> = ({ variant = 'neutral', children, className = "", icon }) => {
  const styles = {
    gold: "badge-gold text-amber-900 border-amber-400/50",
    forest: "badge-forest text-emerald-950 border-emerald-700/30",
    terracotta: "badge-terracotta text-amber-950 border-orange-400/40",
    neutral: "bg-heritage-sandstone text-heritage-slate border-heritage-border"
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm transition-all ${styles} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

export const HeritageCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
  hoverEffect?: boolean;
}> = ({ children, className = "", onClick, hoverEffect = true }) => (
  <div 
    onClick={onClick}
    className={`relative bg-heritage-parchment/95 rounded-xl border border-heritage-border/80 shadow-heritage-sm p-5 transition-all duration-300 ${
      hoverEffect ? 'hover:shadow-heritage-md hover:border-heritage-gold/50 cursor-pointer' : ''
    } ${className}`}
  >
    <JaaliCorner position="top-left" className="top-1 left-1 text-heritage-gold/40" />
    <JaaliCorner position="bottom-right" className="bottom-1 right-1 text-heritage-gold/40" />
    {children}
  </div>
);
