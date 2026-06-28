"use client";

import { useTransition } from "./TransitionContext";

export default function TransitionLink({ 
  href, 
  children, 
  className,
  style
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) {
  const { navigate } = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Use our custom navigation which triggers the preloader
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={style}>
      {children}
    </a>
  );
}
