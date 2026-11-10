import React from "react";

export function DoodleStar({ className = "", size = 28, color = "#F59E0B" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 2 C20 12, 28 20, 38 20 C28 20, 20 28, 20 38 C20 28, 12 20, 2 20 C12 20, 20 12, 2 2 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="1.5" fill={color} />
    </svg>
  );
}

export function DoodleSparkle({ className = "", size = 24, color = "#10B981" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className = "", color = "#4B5563", direction = "down-left" }: { className?: string; color?: string; direction?: "down-left" | "down-right" | "up-right" | "curve" }) {
  if (direction === "curve") {
    return (
      <svg width="44" height="40" viewBox="0 0 44 40" fill="none" className={className} aria-hidden="true">
        <path
          d="M8 32 C12 16, 26 8, 38 12"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M32 6 L39 12 L33 18"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (direction === "down-right") {
    return (
      <svg width="40" height="38" viewBox="0 0 40 38" fill="none" className={className} aria-hidden="true">
        <path
          d="M6 8 C14 12, 24 16, 32 30"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M23 29 L32 30 L31 21"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="46" height="42" viewBox="0 0 46 42" fill="none" className={className} aria-hidden="true">
      <path
        d="M38 6 C30 18, 20 26, 8 32"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M7 23 L8 32 L17 33"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleSquiggle({ className = "", color = "#E11D48", width = 80, height = 12 }: { className?: string; color?: string; width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 7 C8 2, 14 12, 20 7 C26 2, 32 12, 38 7 C44 2, 50 12, 56 7 C62 2, 68 12, 74 7 C80 2, 86 12, 92 7 C95 4, 98 9, 99 7"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleLoop({ className = "", color = "#F43F5E" }: { className?: string; color?: string }) {
  return (
    <svg width="34" height="48" viewBox="0 0 34 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 4 C18 8, 28 14, 26 24 C24 32, 10 34, 6 26 C2 18, 16 12, 28 20 C34 26, 28 42, 12 44"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleCoffee({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* Mug Body */}
      <rect x="14" y="22" width="28" height="30" rx="6" stroke="#2B2D42" strokeWidth="2.5" fill="#FFFFFF" />
      {/* Handle */}
      <path d="M42 27 C50 27, 52 40, 42 42" stroke="#2B2D42" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Heart */}
      <path
        d="M28 34 C28 32, 25 30, 23 32 C20 34, 23 37, 28 41 C33 37, 36 34, 33 32 C31 30, 28 32, 28 34 Z"
        fill="#E11D48"
      />
      {/* Steam lines */}
      <path d="M20 16 C20 13, 23 11, 21 8" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 17 C28 14, 31 12, 29 7" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 16 C36 13, 39 11, 37 8" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleGraduationCap({ className = "", size = 36 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 8 L42 17 L24 26 L6 17 Z" stroke="#374151" strokeWidth="2.2" fill="#F3F4F6" strokeLinejoin="round" />
      <path d="M12 21 V31 C12 35, 36 35, 36 31 V21" stroke="#374151" strokeWidth="2.2" fill="none" />
      <path d="M40 18 V30 C40 33, 42 34, 43 36" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" />
      <circle cx="43" cy="37" r="1.5" fill="#E11D48" />
    </svg>
  );
}

export function DoodleSmiley({ className = "", size = 34 }: { className?: string; size?: number }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full shadow-md select-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: "#A3E635",
        border: "2px solid #1E293B",
      }}
    >
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="9" r="1.8" fill="#1E293B" />
        <circle cx="16" cy="9" r="1.8" fill="#1E293B" />
        <path d="M7 14 C9 18, 15 18, 17 14" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function TapeSticker({ text = "Code. Create. Elevate.", className = "" }: { text?: string; className?: string }) {
  return (
    <div
      className={`relative inline-block px-5 py-3 shadow-md transition-transform duration-300 hover:rotate-0 hover:scale-105 cursor-pointer ${className}`}
      style={{
        backgroundColor: "#C4B5FD",
        transform: "rotate(6deg)",
        borderRadius: "4px",
        boxShadow: "2px 4px 12px rgba(109, 40, 217, 0.2)",
      }}
    >
      <div
        className="text-base sm:text-lg font-bold text-slate-900 tracking-tight select-none"
        style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif", fontStyle: "italic" }}
      >
        {text}
      </div>
      {/* Tape texture edges */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 opacity-50 pointer-events-none"
        style={{
          backgroundColor: "#FAF5FF",
          border: "1px dashed rgba(107, 114, 128, 0.3)",
          transform: "rotate(-2deg)",
        }}
      />
    </div>
  );
}
