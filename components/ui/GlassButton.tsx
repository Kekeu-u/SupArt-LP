"use client";

import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className = "",
  href,
}) => {
  const buttonStyles: React.CSSProperties = {
    background: "linear-gradient(-75deg, rgba(15, 15, 15, 0.95), rgba(35, 35, 35, 0.98), rgba(15, 15, 15, 0.95))",
    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    transition: "all 300ms ease",
  };

  const containerClasses = `relative z-10 rounded-full ${className}`;
  const buttonClasses = "cursor-pointer relative rounded-full outline-none focus:outline-none flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white hover:scale-[0.98] active:scale-[0.95] transition-transform";

  const content = (
    <>
      <span>{children}</span>
      <FaExternalLinkAlt className="text-xs text-blue-400" />
    </>
  );

  return (
    <div className={containerClasses}>
      {href ? (
        <a href={href} className={buttonClasses} style={buttonStyles}>
          {content}
        </a>
      ) : (
        <button className={buttonClasses} style={buttonStyles}>
          {content}
        </button>
      )}
    </div>
  );
};
