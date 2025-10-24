import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg" | "xl";
}

export const Card: React.FC<CardProps> = ({ children, className = "", padding = "md", shadow = "md" }) => {
  const paddings = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const shadows = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  const classes = `bg-white rounded-lg ${paddings[padding]} ${shadows[shadow]} ${className}`;

  return <div className={classes}>{children}</div>;
};
